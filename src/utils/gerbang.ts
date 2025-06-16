import { Column } from '@/components/organism/Table/CustomTable';
import { GerbangData } from '@/types/gerbang';

export const COLUMN_GERBANG: Column<GerbangData>[] = [
  { key: 'no', label: 'No' },
  { key: 'NamaCabang', label: 'Ruas' },
  { key: 'NamaGerbang', label: 'Gerbang' },
  { key: 'action', label: 'Aksi' },
] as Column<GerbangData>[];
