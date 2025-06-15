export type LalinCategory = 'tunai' | 'etoll' | 'flo' | 'ktp' | 'keseluruhan' | 'half-total';

export interface LalinRawData {
  id: number;
  IdCabang: number;
  IdGerbang: number;
  Tanggal: string;
  Shift: number;
  IdGardu: number;
  Golongan: number;
  IdAsalGerbang: number;
  Tunai: number;
  DinasOpr: number;
  DinasMitra: number;
  DinasKary: number;
  eMandiri: number;
  eBri: number;
  eBni: number;
  eBca: number;
  eNobu: number;
  eDKI: number;
  eMega: number;
  eFlo: number;
  [key: string]: string | number;
}

export interface LalinGroupedData {
  IdCabang: string;
  IdGerbang: string;
  IdGardu: string;
  hari: string;
  Tanggal: string;
  metodePembayaran: string;
  gol1: number;
  gol2: number;
  gol3: number;
  gol4: number;
  gol5: number;
  total: number;
}

export interface UseLalinDataReturn {
  data: LalinGroupedData[];
  isLoading: boolean;
  error: Error | null;
  activeTab: LalinCategory;
  setActiveTab: (tab: LalinCategory) => void;
  handleFilter: (values: LalinFilterValues) => void;
  handleExportExcel: () => void;
  handleExportPDF: () => void;
}

export interface LalinFilterValues {
  search?: string;
  tanggal?: string | null;
  id?: string;
}
