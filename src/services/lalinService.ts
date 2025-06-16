import axios from '@/lib/axios';
import { LalinFilterValues } from '@/types/lalin';

export const lalinService = {
  getLalin: (params?: LalinFilterValues) => axios.get('/lalins', { params }),
};
