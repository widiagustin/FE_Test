import { FC } from 'react';
import { IconCalendar, IconSearch } from '@tabler/icons-react';
import { Button, Flex, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { GerbangFilterValues } from '@/types/gerbang';
import { LalinFilterValues } from '@/types/lalin';

interface FilterSectionProps {
  showDate?: boolean;
  onFilter: (values: LalinFilterValues | GerbangFilterValues) => void;
}

export const FilterSection: FC<FilterSectionProps> = ({ onFilter, showDate = false }) => {
  const form = useForm<LalinFilterValues | GerbangFilterValues>({
    initialValues: {
      search: '',
      tanggal: null,
    },
  });

  const handleFilterClick = () => {
    onFilter(form.values);
  };

  const handleResetClick = () => {
    form.reset();
    onFilter({ search: '', tanggal: null });
  };

  const iconSearch = <IconSearch size={16} />;
  const iconCalendar = <IconCalendar size={16} />;

  return (
    <>
      <Flex align="center" gap="xs">
        <TextInput
          placeholder="Search..."
          size="sm"
          radius="sm"
          leftSectionPointerEvents="none"
          leftSection={iconSearch}
          {...form.getInputProps('search')}
        />
        {showDate && (
          <DatePickerInput
            placeholder="Pilih Tanggal"
            {...form.getInputProps('tanggal')}
            rightSectionPointerEvents="none"
            rightSection={iconCalendar}
            locale="id"
            w={300}
            valueFormat="YYYY-MM-DD"
            clearable
          />
        )}
      </Flex>
      <Flex mt={15} gap="xs">
        <Button size="sm" radius="md" onClick={handleFilterClick}>
          Filter
        </Button>
        <Button size="sm" radius="md" variant="outline" onClick={handleResetClick}>
          Reset
        </Button>
      </Flex>
    </>
  );
};
