import { Skeleton } from '@mantine/core';

export function TableSkeleton({ rows, columns }: { rows: number; columns: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <td key={colIndex}>
              <Skeleton height={20} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
