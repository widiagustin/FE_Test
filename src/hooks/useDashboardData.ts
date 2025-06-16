import { useEffect, useState } from 'react';
import { lalinService } from '@/services/lalinService';
import { LalinFilterValues, LalinRawData } from '@/types/lalin';
import { getBarDataPayment } from '@/utils/dashboard';

interface DashboardChartData {
  barDataPayment: { name: string; value: number }[];
  barDataGerbang: { name: string; value: number }[];
  pieDataShift: { name: string; value: number; color: string }[];
  pieDataRuas: { name: string; value: number; color: string }[];
}

export const useDashboardData = () => {
  const [data, setData] = useState<LalinRawData[]>([]);
  const [chartData, setChartData] = useState<DashboardChartData>({
    barDataPayment: [],
    barDataGerbang: [],
    pieDataShift: [],
    pieDataRuas: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const shiftColors: Record<number, string> = {
    1: '#4e79a7',
    2: '#f28e2b',
    3: '#e15759',
  };

  const getPieDataByShift = (data: LalinRawData[]) => {
    const shiftLalinMap = new Map<number, number>();

    data.forEach((d) => {
      const shift = d.Shift;
      const totalLalin =
        (d.eMandiri || 0) +
        (d.eBri || 0) +
        (d.eBni || 0) +
        (d.eBca || 0) +
        (d.eNobu || 0) +
        (d.eDKI || 0) +
        (d.eMega || 0) +
        (d.eFlo || 0);

      shiftLalinMap.set(shift, (shiftLalinMap.get(shift) || 0) + totalLalin);
    });

    const shiftNames: Record<number, string> = {
      1: 'Shift 1',
      2: 'Shift 2',
      3: 'Shift 3',
    };

    return Array.from(shiftLalinMap.entries()).map(([shift, total]) => ({
      name: shiftNames[shift] || `Shift ${shift}`,
      value: total,
      color: shiftColors[shift] || '#ccc',
    }));
  };

  const getBarDataGerbang = (data: LalinRawData[]) => {
    const gerbangMap = new Map<number, number>();

    data.forEach((item) => {
      const count = gerbangMap.get(item.IdGerbang) || 0;
      gerbangMap.set(item.IdGerbang, count + 1);
    });

    return Array.from(gerbangMap.entries()).map(([id, value]) => ({
      name: `Gerbang ${id}`,
      value,
    }));
  };

  const getPieDataRuas = (data: LalinRawData[]) => {
    const gerbangMap = new Map<number, number>();

    data.forEach((item) => {
      const count = gerbangMap.get(item.IdCabang) || 0;
      gerbangMap.set(item.IdCabang, count + 1);
    });

    return Array.from(gerbangMap.entries()).map(([id, value], index) => ({
      name: `Ruas ${id}`,
      value,
      color: shiftColors[index + 1] || '#ccc',
    }));
  };

  const fetchData = async (params: LalinFilterValues) => {
    setIsLoading(true);
    try {
      const res = await lalinService.getLalin(params);
      const rows = res.data.data.rows.rows;
      setData(rows || []);
    } catch (err) {
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const updateChartData = (newData: LalinRawData[]) => {
    if (newData?.length > 0) {
      setChartData({
        barDataPayment: getBarDataPayment(newData),
        barDataGerbang: getBarDataGerbang(newData),
        pieDataShift: getPieDataByShift(newData),
        pieDataRuas: getPieDataRuas(newData),
      });
    } else {
      setChartData({
        barDataPayment: [],
        barDataGerbang: [],
        pieDataShift: [],
        pieDataRuas: [],
      });
    }
  };

  useEffect(() => {
    updateChartData(data);
  }, [data]);

  useEffect(() => {
    fetchData({});
  }, []);

  return {
    data,
    chartData,
    isLoading,
    fetchData,
  };
};
