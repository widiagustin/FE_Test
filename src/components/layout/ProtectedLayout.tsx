import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { AppShell } from '@mantine/core';
import { useNavbarStore } from '@/stores/useNavbarStore';
import { Header } from './Header';
import { Navbar } from './Navbar';

export const ProtectedLayout: FC = () => {
  const { isCollapsed } = useNavbarStore();

  return (
    <AppShell navbar={{ width: isCollapsed ? 65 : 300, breakpoint: 'sm' }} padding="md">
      <AppShell.Header zIndex={100}>
        <Header />
      </AppShell.Header>
      <AppShell.Navbar zIndex={90} mt={60}>
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Main mt={50} bg="#f6fbff">
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
