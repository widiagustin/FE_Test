export interface GerbangData {
  id: number;
  IdCabang: number;
  NamaGerbang: string;
  NamaCabang?: string;
}

export interface GerbangFilterValues {
  search?: string;
  NamaCabang?: string;
  NamaGerbang?: string;
  tanggal?: string | null;
}

export interface UseGerbangDataReturn {
  data: GerbangData[];
  isLoading: boolean;
  error: Error | null;
  ruasOptions: { label: string; value: string; IdCabang: string }[];
  handleFilter: (values: GerbangFilterValues) => void;
  handleSubmit: (values: GerbangData) => void;
  handleDelete: (value: { id: number; IdCabang: number }) => void;
}
