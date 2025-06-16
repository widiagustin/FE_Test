import { FC } from 'react';
import { BarChart, DonutChart } from '@mantine/charts';
import { Box, Flex, Text } from '@mantine/core';

interface ChartData {
  name: string;
  value: number;
}

interface PieData {
  name: string;
  value: number;
  color: string;
}

interface ChartSectionProps {
  barData: ChartData[];
  pieData: PieData[];
  title?: string;
}

export const ChartSection: FC<ChartSectionProps> = ({ barData, pieData, title }) => {
  const total = pieData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Flex gap={30}>
      <Box w="70%">
        <BarChart
          h={300}
          data={barData}
          dataKey="name"
          series={[{ name: 'value', color: 'violet.6' }]}
          tooltipAnimationDuration={200}
          tickLine="x"
        />
      </Box>
      <Box>
        <DonutChart
          withLabelsLine
          labelsType="percent"
          withLabels
          data={pieData}
          tooltipDataSource="segment"
          size={250}
          thickness={50}
        />
        <Box style={{ justifySelf: 'center' }}>
          <Text fw="bold">{title || 'Total Lalin'}</Text>
          {pieData.map((item) => (
            <Flex key={item.name} align="center" gap={5}>
              <Box w={10} h={10} bg={item.color} style={{ borderRadius: '100%' }} />
              <Flex w={200} justify="space-between">
                <Text>{item.name}</Text>
                <Text>{`${Math.round((item.value / total) * 100)}%`}</Text>
              </Flex>
            </Flex>
          ))}
        </Box>
      </Box>
    </Flex>
  );
};
