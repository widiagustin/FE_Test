import { useEffect, useState } from 'react';
import { notifications } from '@mantine/notifications';
import { gerbangService } from '@/services/gerbangService';
import { useGerbangStore } from '@/stores/gerbangStore';
import { GerbangData, GerbangFilterValues, UseGerbangDataReturn } from '@/types/gerbang';

export const testKeys = ['NamaCabang', 'NamaGerbang'];

export const useGerbangData = (): UseGerbangDataReturn => {
  const [data, setData] = useState<GerbangData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { selectedGerbang } = useGerbangStore();

  const fetchData = async (params: GerbangFilterValues) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await gerbangService.getGerbang(params);
      setData(res.data.data.rows.rows);
    } catch (err) {
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getNextId = (data: GerbangData[]): number => {
    if (data.length === 0) {
      return 1;
    }
    const ids = data
      .map((d) => d.id)
      .filter((id): id is string => id !== undefined)
      .map((id) => parseInt(id, 10));
    return Math.max(...ids, 0) + 1;
  };

  const handleSubmit = async (values: GerbangData) => {
    try {
      const selectedCabang = ruasOptions.find((r) => r.value === values.IdCabang);
      const nextId = getNextId(data);
      const payload = {
        id: values.id ?? nextId,
        IdCabang: Number(values.IdCabang),
        NamaGerbang: values.NamaGerbang,
        NamaCabang: selectedCabang?.label ?? '',
      };

      if (selectedGerbang) {
        await gerbangService.editGerbang(payload);
        notifications.show({
          title: 'Success',
          message: 'Berhasil mengubah data gerbang',
          color: 'green',
        });
      } else {
        await gerbangService.createGerbang(payload);
        notifications.show({
          title: 'Success',
          message: 'Berhasil menambah data gerbang',
          color: 'green',
        });
      }
      await fetchData({});
    } catch (err) {
      return null;
    }
  };

  const handleDelete = async (value: { id: number; IdCabang: number }) => {
    try {
      await gerbangService.deleteGerbang(value);
      notifications.show({
        title: 'Success',
        message: 'Berhasil menghapus data gerbang',
        color: 'green',
      });
      await fetchData({});
    } catch (err) {
      return null;
    }
  };

  const ruasOptions =
    data && data.length > 0
      ? Array.from(
          new Map(
            data.map((item) => [
              item.NamaCabang ?? '',
              {
                label: item.NamaCabang ?? '',
                value: item.IdCabang.toString(),
                IdCabang: item.IdCabang,
              },
            ])
          ).values()
        )
      : [];

  const handleFilter = async (values: GerbangFilterValues) => {
    const { search } = values;
    let foundData = false;

    for (const key of testKeys) {
      try {
        const res = await gerbangService.getGerbang({ [key]: search });
        const rows = res.data.data.rows.rows;
        if (rows.length > 0) {
          setData(rows);
          foundData = true;
          break;
        }
      } catch (e) {
        continue; // Continue to next key if there's an error
      }
    }

    if (!foundData) {
      setData([]);
    }

    return {};
  };

  useEffect(() => {
    fetchData({});
  }, []);

  return {
    data,
    isLoading,
    error,
    handleFilter,
    handleSubmit,
    handleDelete,
    ruasOptions,
  };
};
