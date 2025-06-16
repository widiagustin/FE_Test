import { FC, useState } from 'react';
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import { ActionIcon, Box, Button, Flex, Group, Modal, Text } from '@mantine/core';
import { FilterSection } from '@/components/organism/Lalin/FilterSection';
import { GerbangFormModal } from '@/components/organism/Master-Gerbang/GerbangFormModal';
import { CustomTable } from '@/components/organism/Table/CustomTable';
import { useGerbangData } from '@/hooks/useGerbangData';
import { useGerbangStore } from '@/stores/gerbangStore';
import { GerbangData } from '@/types/gerbang';
import { COLUMN_GERBANG } from '@/utils/gerbang';

export const MasterGerbang: FC = () => {
  const { data, isLoading, handleFilter, handleSubmit, handleDelete } = useGerbangData();
  const { openModal } = useGerbangStore();
  const [deleteData, setDeleteData] = useState<GerbangData | null>(null);

  const handleEdit = (row: GerbangData) => {
    openModal(row, 'edit');
  };

  const handleViewClick = (row: GerbangData) => {
    openModal(row, 'view');
  };

  const handleDeleteClick = (row: GerbangData) => {
    setDeleteData(row);
  };

  const confirmDelete = async () => {
    const { id, IdCabang } = deleteData;
    if (deleteData?.id) {
      await handleDelete({ id, IdCabang });
      setDeleteData(null);
    }
  };

  return (
    <div>
      <h2>Master Gerbang</h2>
      <Box className="wrapper">
        <FilterSection onFilter={handleFilter} />
      </Box>
      <Box mt={20} className="wrapper">
        <Flex justify="end" mb={20}>
          <GerbangFormModal onSubmit={handleSubmit} />
        </Flex>
        <CustomTable
          data={data}
          columns={COLUMN_GERBANG}
          loading={isLoading}
          renderAction={(row) => (
            <>
              <ActionIcon aria-label="Edit" variant="light" onClick={() => handleEdit(row)}>
                <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
              </ActionIcon>
              <ActionIcon
                aria-label="View"
                variant="light"
                color="green"
                onClick={() => handleViewClick(row)}
              >
                <IconEye style={{ width: '70%', height: '70%' }} stroke={1.5} />
              </ActionIcon>
              <ActionIcon
                aria-label="Delete"
                variant="light"
                color="red"
                onClick={() => handleDeleteClick(row)}
              >
                <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
              </ActionIcon>
            </>
          )}
        />
      </Box>

      <Modal
        opened={!!deleteData}
        onClose={() => setDeleteData(null)}
        title="Konfirmasi Hapus"
        size="md"
        centered
      >
        <Text mb="xl">Apakah Anda yakin ingin menghapus data ini?</Text>
        <Group justify="flex-end">
          <Button variant="outline" onClick={() => setDeleteData(null)}>
            Batal
          </Button>
          <Button color="red" onClick={confirmDelete}>
            Hapus
          </Button>
        </Group>
      </Modal>
    </div>
  );
};
