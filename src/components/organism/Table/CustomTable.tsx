import { ReactNode, useState } from 'react';
import { Box, Flex, Group, Pagination, ScrollArea, Select, Table, Text } from '@mantine/core';
import { TableSkeleton } from './TableSkeleton';

export interface Column<T> {
  key: keyof T;
  label: string;
}

const LIMIT_OPTIONS = [5, 15, 20, 50].map((val) => ({
  value: val.toString(),
  label: val.toString(),
}));

interface TableWithPaginationProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  groupByKey?: keyof T;
  getGroupLabel?: (key: string) => string;
  getTotalSum?: (rows: T[]) => Partial<T>;
  renderAction?: (row: T) => ReactNode;
}

export function CustomTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  groupByKey,
  getGroupLabel,
  getTotalSum,
  renderAction,
}: TableWithPaginationProps<T>) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const start = (page - 1) * limit;
  const paginated = data.slice(start, start + limit);

  const groupedData = groupByKey
    ? data.reduce(
        (acc, row) => {
          const key = String(row[groupByKey]);
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(row);
          return acc;
        },
        {} as Record<string, T[]>
      )
    : {};

  const handleLimitChange = (value: string | null) => {
    if (value) {
      setLimit(Number(value));
      setPage(1);
    }
  };

  return (
    <Box>
      <ScrollArea>
        <Table highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead bg="gray.1">
            <Table.Tr>
              {columns.map((col) => (
                <Table.Th
                  key={col.key as string}
                  style={{ width: col.key === 'no' ? '50px' : 'auto' }}
                >
                  {col.label}
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          {loading ? (
            <Table.Tbody>
              <TableSkeleton rows={limit} columns={columns.length + 1} />
            </Table.Tbody>
          ) : paginated.length > 0 ? (
            <>
              <Table.Tbody>
                {paginated.map((row, i) => (
                  <Table.Tr key={i}>
                    {columns.map((col) => (
                      <Table.Td
                        key={col.key as string}
                        style={{ width: col.key === 'no' ? '50px' : 'auto' }}
                      >
                        {col.key === 'no' ? i + 1 : String(row[col.key] ?? '')}
                        {col.key === 'action' && renderAction && (
                          <Flex gap={10}>{renderAction(row)}</Flex>
                        )}
                      </Table.Td>
                    ))}
                  </Table.Tr>
                ))}
                {groupByKey &&
                  getGroupLabel &&
                  getTotalSum &&
                  Object.entries(groupedData).map(([groupKey, groupRows], idx) => {
                    const sumRow = getTotalSum(groupRows);
                    return (
                      <Table.Tr key={`sum-${groupKey}`} bg={idx % 2 === 0 ? 'gray.1' : 'gray.2'}>
                        {columns.map((col, i) => {
                          if (i >= 1 && i <= 6) {
                            return null;
                          }

                          return (
                            <Table.Td
                              key={String(col.key)}
                              colSpan={i === 0 ? 7 : 0}
                              style={{ width: col.key === 'no' ? '50px' : 'auto' }}
                            >
                              {i === 0 ? (
                                <strong>{getGroupLabel(groupKey)}</strong>
                              ) : (
                                (sumRow[col.key] ?? '')
                              )}
                            </Table.Td>
                          );
                        })}
                      </Table.Tr>
                    );
                  })}
                {getTotalSum && (
                  <Table.Tr bg="gray.3">
                    {columns.map((col, i) => {
                      const totalRow = getTotalSum(data);

                      if (i === 0) {
                        return (
                          <Table.Td key="total-label" colSpan={3} style={{ fontWeight: 'bold' }}>
                            Total Lalin Keseluruhan
                          </Table.Td>
                        );
                      }

                      if (i < 3) {
                        return null;
                      }

                      return (
                        <Table.Td
                          key={String(col.key)}
                          style={{
                            fontWeight: 'bold',
                          }}
                        >
                          {totalRow[col.key]}
                        </Table.Td>
                      );
                    })}
                  </Table.Tr>
                )}
              </Table.Tbody>
            </>
          ) : (
            <Table.Tbody>
              <Table.Tr>
                <Table.Td colSpan={columns.length}>
                  <Text ta="center">Tidak ada data</Text>
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          )}
        </Table>
      </ScrollArea>

      <Group justify="end" mt="md">
        <Flex align="center" gap={5}>
          <Text>Show</Text>
          <Select
            placeholder="Limit..."
            w={100}
            value={limit.toString()}
            data={LIMIT_OPTIONS}
            checkIconPosition="right"
            onChange={handleLimitChange}
          />
          <Text>Entries</Text>
        </Flex>
        <Pagination total={Math.ceil(data.length / limit)} value={page} onChange={setPage} />
      </Group>
    </Box>
  );
}
