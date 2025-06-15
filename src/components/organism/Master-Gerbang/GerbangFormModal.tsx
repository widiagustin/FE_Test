import { FC, useEffect } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { Box, Button, Flex, Group, Modal, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useGerbangData } from '@/hooks/useGerbangData';
import { useGerbangStore } from '@/stores/gerbangStore';
import { GerbangData } from '@/types/gerbang';

interface GerbangFormModalProps {
  onSubmit: (values: GerbangData) => void;
}

export const GerbangFormModal: FC<GerbangFormModalProps> = ({
  onSubmit,
}: GerbangFormModalProps) => {
  const { ruasOptions } = useGerbangData();
  const { isModalOpen, selectedGerbang, mode, closeModal } = useGerbangStore();

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      id: '',
      IdCabang: '',
      NamaGerbang: '',
    },
    validate: {
      IdCabang: (value: string) => (value.trim() === '' ? 'Cabang wajib diisi' : null),
      NamaGerbang: (value: string) => (value.trim() === '' ? 'Gerbang wajib diisi' : null),
    },
  });

  useEffect(() => {
    if (selectedGerbang) {
      form.setValues({
        id: selectedGerbang.id,
        IdCabang: selectedGerbang.IdCabang.toString(),
        NamaGerbang: selectedGerbang.NamaGerbang,
      });
    }
  }, [selectedGerbang]);

  const handleClose = () => {
    form.reset();
    closeModal();
  };

  const handleSubmitClick = async () => {
    const valid = form.validate();
    if (!valid.hasErrors) {
      try {
        await onSubmit(form.values);
        handleClose();
      } catch (error) {
        return null;
      }
    }
  };

  const getModalTitle = () => {
    switch (mode) {
      case 'view':
        return 'Detail Gerbang';
      case 'edit':
        return 'Edit Gerbang';
      default:
        return 'Tambah Gerbang';
    }
  };

  const renderContent = () => {
    const isViewMode = mode === 'view';

    return (
      <>
        <Flex gap={20} w="100%">
          <Select
            withAsterisk
            label="Ruas"
            data={ruasOptions}
            placeholder="Select ruas"
            value={form.values.IdCabang}
            error={form.errors.IdCabang}
            w="50%"
            onChange={(val) => form.setFieldValue('IdCabang', val)}
            disabled={isViewMode}
          />
          <Box w="50%">
            <TextInput
              withAsterisk
              label="Gerbang"
              placeholder="Input gerbang"
              {...form.getInputProps('NamaGerbang')}
              disabled={isViewMode}
            />
          </Box>
        </Flex>

        <Group justify="flex-end" mt="md" gap={10}>
          <Button type="reset" onClick={handleClose} variant="outline">
            {isViewMode ? 'Tutup' : 'Batal'}
          </Button>
          {!isViewMode && (
            <Button type="submit" onClick={handleSubmitClick}>
              Submit
            </Button>
          )}
        </Group>
      </>
    );
  };

  return (
    <>
      <Modal opened={isModalOpen} onClose={handleClose} title={getModalTitle()} size="lg" centered>
        {renderContent()}
      </Modal>

      {mode === 'create' && (
        <Button
          leftSection={<IconPlus size={14} />}
          onClick={() => useGerbangStore.getState().openModal()}
        >
          Tambah
        </Button>
      )}
    </>
  );
};
