import { Column } from '@/components/organism/Table/CustomTable';
import { LalinCategory, LalinGroupedData } from '@/types/lalin';

export const LALIN_TABS = [
  { value: 'tunai', label: 'Total Tunai' },
  { value: 'etoll', label: 'Total E-Toll' },
  { value: 'flo', label: 'Total Flo' },
  { value: 'ktp', label: 'Total KTP' },
  { value: 'keseluruhan', label: 'Total Keseluruhan' },
  { value: 'half-total', label: 'Total E-Toll + Tunai + Flo' },
] as const;

export const METODE_PEMBAYARAN_LABELS: Record<LalinCategory, string> = {
  tunai: 'Tunai',
  etoll: 'E-Toll',
  flo: 'Flo',
  ktp: 'KTP',
  keseluruhan: 'Keseluruhan',
  'half-total': 'E-Toll+Tunai+Flo',
} as const;

export const CATEGORY_LALIN = {
  tunai: ['Tunai'],
  etoll: ['eBca', 'eBni', 'eBri', 'eDKI', 'eMandiri', 'eMega', 'eNobu'],
  flo: ['eFlo'],
  ktp: ['DinasKary', 'DinasMitra', 'DinasOpr'],
  'half-total': ['Tunai', 'eBca', 'eBni', 'eBri', 'eDKI', 'eMandiri', 'eMega', 'eNobu', 'eFlo'],
  keseluruhan: [
    'Tunai',
    'eBca',
    'eBni',
    'eBri',
    'eDKI',
    'eMandiri',
    'eMega',
    'eNobu',
    'eFlo',
    'DinasKary',
    'DinasMitra',
    'DinasOpr',
  ],
};

export const COLUMN_LALIN: Column<LalinGroupedData>[] = [
  { key: 'IdCabang', label: 'No' },
  { key: 'IdCabang', label: 'Ruas' },
  { key: 'IdGerbang', label: 'Gerbang' },
  { key: 'IdGardu', label: 'Gardu' },
  { key: 'hari', label: 'Hari' },
  { key: 'Tanggal', label: 'Tanggal' },
  { key: 'metodePembayaran', label: 'Metode Pembayaran' },
  { key: 'gol1', label: 'Gol I' },
  { key: 'gol2', label: 'Gol II' },
  { key: 'gol3', label: 'Gol III' },
  { key: 'gol4', label: 'Gol IV' },
  { key: 'gol5', label: 'Gol V' },
  { key: 'total', label: 'Total Lalin' },
] as Column<LalinGroupedData>[];
