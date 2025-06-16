import { FC } from 'react';
import { IconFileExcel, IconFileExport, IconPdf } from '@tabler/icons-react';
import { Button, Menu } from '@mantine/core';

interface LalinMenuExportProps {
  handleExportExcel: () => void;
  handleExportPDF: () => void;
}

export const LalinMenuExport: FC<LalinMenuExportProps> = ({
  handleExportExcel,
  handleExportPDF,
}: LalinMenuExportProps) => {
  return (
    <>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button leftSection={<IconFileExport size={14} />}>Export</Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Choose an Option:</Menu.Label>
          <Menu.Item leftSection={<IconFileExcel size={14} />} onClick={handleExportExcel}>
            Excel
          </Menu.Item>
          <Menu.Item leftSection={<IconPdf size={14} />} onClick={handleExportPDF}>
            PDF
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};
