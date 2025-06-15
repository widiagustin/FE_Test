import { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { lalinService } from '@/services/lalinService';
import {
  LalinCategory,
  LalinFilterValues,
  LalinGroupedData,
  LalinRawData,
  UseLalinDataReturn,
} from '@/types/lalin';
import { CATEGORY_LALIN, COLUMN_LALIN, METODE_PEMBAYARAN_LABELS } from '@/utils/lalin';

type GolonganKey = 'gol1' | 'gol2' | 'gol3' | 'gol4' | 'gol5';

export const useLalinData = (): UseLalinDataReturn => {
  const [rawData, setRawData] = useState<LalinRawData[]>([]);
  const [groupedData, setGroupedData] = useState<LalinGroupedData[]>([]);
  const [activeTab, setActiveTab] = useState<LalinCategory>('tunai');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (params: LalinFilterValues) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await lalinService.getLalin(params);
      setRawData(res.data.data.rows.rows);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch data'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilter = async (values: LalinFilterValues) => {
    try {
      await fetchData(values);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch data'));
    }
  };

  useEffect(() => {
    fetchData({});
  }, []);

  useEffect(() => {
    if (!rawData.length) {
      setGroupedData([]);
      return;
    }

    const sumberKategori = CATEGORY_LALIN[activeTab];
    if (!sumberKategori) {
      setGroupedData([]);
      return;
    }

    const grouped = rawData.reduce<Record<string, LalinGroupedData>>((acc, item) => {
      const key = `${item.IdCabang}-${item.IdGerbang}-${item.IdGardu}-${item.IdAsalGerbang}-${item.Tanggal}`;

      if (!acc[key]) {
        acc[key] = {
          IdCabang: `Ruas ${item.IdCabang}`,
          IdGerbang: `Gerbang ${item.IdGerbang}`,
          IdGardu: item.IdGardu,
          hari: new Date(item.Tanggal).toLocaleDateString('id-ID', { weekday: 'long' }),
          Tanggal: new Date(item.Tanggal).toLocaleDateString('id-ID'),
          metodePembayaran: METODE_PEMBAYARAN_LABELS[activeTab],
          gol1: 0,
          gol2: 0,
          gol3: 0,
          gol4: 0,
          gol5: 0,
          total: 0,
        };
      }

      const golongan = Number(item.Golongan);
      const jumlah = sumberKategori.reduce((sum, kategori) => sum + Number(item[kategori] || 0), 0);

      acc[key].total += jumlah;

      if (golongan >= 1 && golongan <= 5) {
        const golonganKey = `gol${golongan}` as GolonganKey;
        acc[key][golonganKey] += jumlah;
      }

      return acc;
    }, {});

    setGroupedData(Object.values(grouped));
  }, [activeTab, rawData]);

  const handleExportExcel = () => {
    const headers = COLUMN_LALIN.map((col) => col.label);

    const grouped = groupedData.reduce(
      (acc, row) => {
        const key = String(row.IdCabang);
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(row);
        return acc;
      },
      {} as Record<string, typeof groupedData>
    );

    const sheetData: (string | number)[][] = [];

    sheetData.push(headers);

    Object.entries(grouped).forEach(([groupKey, groupRows]) => {
      groupRows.forEach((item, index) => {
        const row = COLUMN_LALIN.map((col) => {
          if (col.key === 'no') {
            return index + 1;
          }
          return item[col.key] ?? '';
        });
        sheetData.push(row);
      });

      const groupTotal = COLUMN_LALIN.map((col) => {
        if (col.key === 'no') {
          return `Total ${groupKey}`;
        }
        if (['gol1', 'gol2', 'gol3', 'gol4', 'gol5', 'total'].includes(col.key)) {
          return groupRows.reduce((sum, row) => sum + (row[col.key] ?? 0), 0);
        }
        return '';
      });
      sheetData.push(groupTotal);
      sheetData.push([]);
    });

    const totalRow = COLUMN_LALIN.map((col, idx) => {
      if (idx === 0) {
        return 'Total Lalin Keseluruhan';
      }
      if (['gol1', 'gol2', 'gol3', 'gol4', 'gol5', 'total'].includes(col.key)) {
        return groupedData.reduce((sum, row) => sum + (row[col.key] ?? 0), 0);
      }
      return '';
    });
    sheetData.push([]);
    sheetData.push(totalRow);

    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
    worksheet['!cols'] = COLUMN_LALIN.map(() => ({ wch: 18 }));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Laporan Lalin');
    XLSX.writeFile(workbook, `laporan_lalin_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF('l', 'mm', 'a4');

    doc.setFontSize(16);
    doc.text('Laporan Lalin Harian', 14, 15);

    const head = [COLUMN_LALIN.map((col) => col.label)];

    const body = groupedData.map((item, i) =>
      COLUMN_LALIN.map((col) => (col.key === 'no' ? i + 1 : (item[col.key] ?? '')))
    );

    const groupedByRuas: Record<string, typeof groupedData> = {};
    for (const item of groupedData) {
      const key = item.IdCabang;
      if (!groupedByRuas[key]) {
        groupedByRuas[key] = [];
      }
      groupedByRuas[key].push(item);
    }

    const totalPerRuas: (string | number)[][] = [];

    Object.entries(groupedByRuas).forEach(([ruas, items]) => {
      const totals = {
        gol1: 0,
        gol2: 0,
        gol3: 0,
        gol4: 0,
        gol5: 0,
        total: 0,
      };

      items.forEach((row) => {
        totals.gol1 += row.gol1 ?? 0;
        totals.gol2 += row.gol2 ?? 0;
        totals.gol3 += row.gol3 ?? 0;
        totals.gol4 += row.gol4 ?? 0;
        totals.gol5 += row.gol5 ?? 0;
        totals.total += row.total ?? 0;
      });

      const row = COLUMN_LALIN.map((col) => {
        if (col.key === 'no') {
          return `Total ${ruas}`;
        }
        if (['gol1', 'gol2', 'gol3', 'gol4', 'gol5', 'total'].includes(col.key)) {
          return totals[col.key as keyof typeof totals];
        }
        return '';
      });

      totalPerRuas.push(row);
    });

    const indexGol1 = COLUMN_LALIN.findIndex((col) => col.key === 'gol1');
    const indexGol2 = COLUMN_LALIN.findIndex((col) => col.key === 'gol2');
    const indexGol3 = COLUMN_LALIN.findIndex((col) => col.key === 'gol3');
    const indexGol4 = COLUMN_LALIN.findIndex((col) => col.key === 'gol4');
    const indexGol5 = COLUMN_LALIN.findIndex((col) => col.key === 'gol5');
    const indexTotal = COLUMN_LALIN.findIndex((col) => col.key === 'total');

    const totalLalin = totalPerRuas.reduce((sum, row) => {
      const gol1 = Number(row[indexGol1] || 0);
      const gol2 = Number(row[indexGol2] || 0);
      const gol3 = Number(row[indexGol3] || 0);
      const gol4 = Number(row[indexGol4] || 0);
      const gol5 = Number(row[indexGol5] || 0);
      return sum + gol1 + gol2 + gol3 + gol4 + gol5;
    }, 0);

    const totalRow = new Array(COLUMN_LALIN.length).fill('');
    totalRow[0] = 'Total Lalin Keseluruhan';
    if (indexTotal !== -1) {
      totalRow[indexTotal] = totalLalin;
    }

    body.push([]);
    totalPerRuas.forEach((row) => body.push(row));
    body.push([]);
    body.push(totalRow);

    autoTable(doc, {
      startY: 20,
      head,
      body,
      styles: {
        fontSize: 9,
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: [255, 255, 255],
      },
    });

    doc.save(`laporan_lalin_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return {
    data: groupedData,
    isLoading,
    error,
    activeTab,
    setActiveTab,
    handleFilter,
    handleExportExcel,
    handleExportPDF,
  };
};
