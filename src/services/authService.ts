import axios from '@/lib/axios';

export const authService = {
  login: (data: { username: string; password: string }) => axios.post('/auth/login', data),
};
