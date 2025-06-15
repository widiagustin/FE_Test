import { FC } from 'react';
import { Alert, Box, Flex } from '@mantine/core';
import { FilterSection } from '@/components/organism/Lalin/FilterSection';
import { LalinMenuExport } from '@/components/organism/Lalin/LalinMenuExport';
import { LalinTable } from '@/components/organism/Lalin/LalinTable';
import { LalinTabs } from '@/components/organism/Lalin/LalinTabs';
import { useLalinData } from '@/hooks/useLalinData';
import { LalinCategory } from '@/types/lalin';

export const LaporanPerHari: FC = () => {
  const {
    data,
    isLoading,
    error,
    activeTab,
    setActiveTab,
    handleFilter,
    handleExportExcel,
    handleExportPDF,
  } = useLalinData();

  const handleTabChange = (value: string | null) => {
    if (value) {
      setActiveTab(value as LalinCategory);
    }
  };

  if (error) {
    return (
      <Alert title="Error" color="red">
        {error.message}
      </Alert>
    );
  }

  return (
    <div>
      <h2>Laporan Lalin Per Hari</h2>

      <Box className="wrapper">
        <FilterSection onFilter={handleFilter} showDate />
      </Box>
      <Box mt={20} className="wrapper">
        <Flex justify="space-between">
          <LalinTabs activeTab={activeTab} onTabChange={handleTabChange} />
          <LalinMenuExport
            handleExportExcel={handleExportExcel}
            handleExportPDF={handleExportPDF}
          />
        </Flex>
        <LalinTable data={data} isLoading={isLoading} />
      </Box>
    </div>
  );
};
