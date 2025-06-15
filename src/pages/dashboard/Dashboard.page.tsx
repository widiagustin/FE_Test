import 'dayjs/locale/id';

import { FC } from 'react';
import { IconCalendar } from '@tabler/icons-react';
import { Box, Button, Flex, LoadingOverlay } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { ChartSection } from '@/components/organism/Dashboard/ChartSection';
import { useDashboardData } from '@/hooks/useDashboardData';
import { LalinFilterValues } from '@/types/lalin';

export const Dashboard: FC = () => {
  const { chartData, isLoading, fetchData } = useDashboardData();
  const { barDataPayment, barDataGerbang, pieDataShift, pieDataRuas } = chartData;

  const form = useForm<LalinFilterValues>({
    initialValues: {
      tanggal: null,
    },
  });

  const iconCalendar = <IconCalendar size={16} />;

  const handleFilter = async () => {
    const { tanggal } = form.values;
    await fetchData(tanggal ? { tanggal } : {});
  };

  const handleReset = () => {
    form.reset();
    fetchData({});
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <Box className="wrapper" pos="relative">
        <LoadingOverlay visible={isLoading} />
        <Flex align="center" gap={10}>
          <DatePickerInput
            placeholder="Pilih Tanggal"
            {...form.getInputProps('tanggal')}
            locale="id"
            rightSectionPointerEvents="none"
            rightSection={iconCalendar}
            w={300}
            valueFormat="YYYY-MM-DD"
            clearable
          />
          <Button size="sm" radius="md" onClick={handleFilter}>
            Filter
          </Button>
          <Button size="sm" radius="md" variant="outline" onClick={handleReset}>
            Reset
          </Button>
        </Flex>
        <Box mt={50}>
          <ChartSection barData={barDataPayment} pieData={pieDataShift} title="Total Lalin" />
        </Box>
        <Box mt={100}>
          <ChartSection barData={barDataGerbang} pieData={pieDataRuas} title="Total Lalin 2" />
        </Box>
      </Box>
    </div>
  );
};
