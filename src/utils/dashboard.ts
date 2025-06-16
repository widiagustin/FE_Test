import { LalinRawData } from '@/types/lalin';

export const getBarDataPayment = (data: LalinRawData[]) => {
  return [
    { name: 'BCA', value: data.reduce((sum, d) => sum + d.eBca, 0) },
    { name: 'BRI', value: data.reduce((sum, d) => sum + d.eBri, 0) },
    { name: 'BNI', value: data.reduce((sum, d) => sum + d.eBni, 0) },
    { name: 'DKI', value: data.reduce((sum, d) => sum + d.eDKI, 0) },
    { name: 'Mandiri', value: data.reduce((sum, d) => sum + d.eMandiri, 0) },
    { name: 'Mega', value: data.reduce((sum, d) => sum + d.eMega, 0) },
    { name: 'Flo', value: data.reduce((sum, d) => sum + d.eFlo, 0) },
  ];
};
