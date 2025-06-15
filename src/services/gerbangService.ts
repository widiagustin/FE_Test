import axios from '@/lib/axios';
import { LalinFilterValues } from '@/types/lalin';

export const gerbangService = {
  getGerbang: (params?: LalinFilterValues) => axios.get('/gerbangs', { params }),

  createGerbang: (body: { IdCabang: number; NamaGerbang: string; NamaCabang: string }) =>
    axios.post('/gerbangs', body),

  editGerbang: (body: { IdCabang: number; NamaGerbang: string; NamaCabang: string }) =>
    axios.put(`/gerbangs/`, body),

  deleteGerbang: (body: { id: number; IdCabang: number }) =>
    axios.delete('/gerbangs/', { data: body }),
};
