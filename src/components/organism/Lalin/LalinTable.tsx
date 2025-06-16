import { FC } from 'react';
import { Box } from '@mantine/core';
import { CustomTable } from '@/components/organism/Table/CustomTable';
import { LalinGroupedData } from '@/types/lalin';
import { COLUMN_LALIN } from '@/utils/lalin';

interface LalinTableProps {
  data: LalinGroupedData[];
  isLoading?: boolean;
}

export const LalinTable: FC<LalinTableProps> = ({ data, isLoading }) => {
  const getTotalSum = (rows: LalinGroupedData[]) => {
    const numericFields = ['gol1', 'gol2', 'gol3', 'gol4', 'gol5', 'total'] as const;
    return rows.reduce(
      (acc, row) => {
        for (const key of numericFields) {
          acc[key] = (acc[key] || 0) + row[key];
        }
        return acc;
      },
      {} as Record<(typeof numericFields)[number], number>
    );
  };

  return (
    <Box mt={20}>
      <CustomTable
        data={data}
        columns={COLUMN_LALIN}
        groupByKey="IdCabang"
        getGroupLabel={(group) => `Total Lalin ${group}`}
        getTotalSum={getTotalSum}
        loading={isLoading}
      />
    </Box>
  );
};
