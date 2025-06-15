import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Paper, PasswordInput, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/stores/authStore';
import styles from '@/styles/components/login.module.scss';

export const Login: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const setToken = useAuthStore((state) => state.setToken);

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      username: (value: string) => (value.trim() === '' ? 'Username wajib diisi' : null),
      password: (value: string) => (value.trim() === '' ? 'Password wajib diisi' : null),
    },
  });

  const handleLogin = async (values: { username: string; password: string }) => {
    try {
      const res = await authService.login(values);
      setToken(res.data.token);

      const from = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (e) {
      form.setErrors({ password: 'Username atau password salah' });
    }
  };

  return (
    <div className={styles.wrapper}>
      <Paper className={styles.form}>
        <Title order={2} className={styles.title}>
          Sign In
        </Title>
        <Box w={350} className={styles.wrapperInputForm}>
          <form onSubmit={form.onSubmit(handleLogin)}>
            <TextInput
              label="Username"
              placeholder="Masukkan username anda..."
              size="md"
              radius="md"
              {...form.getInputProps('username')}
            />

            <PasswordInput
              label="Password"
              placeholder="Masukkan password anda..."
              mt="md"
              size="md"
              radius="md"
              {...form.getInputProps('password')}
            />

            <Box w="100%" className={styles.buttonWrapperEnd}>
              <Button type="submit" mt="xl" size="md" radius="md">
                Login
              </Button>
            </Box>
          </form>
        </Box>
      </Paper>
    </div>
  );
};
