import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ProtectedLayout } from '@/components/layout/ProtectedLayout';
import { Dashboard } from '@/pages/dashboard/Dashboard.page';
import { LaporanPerHari } from '@/pages/laporan-perhari/LaporanPerhari.page';
import { Login } from '@/pages/login';
import { MasterGerbang } from '@/pages/master-gerbang/MasterGerbang.page';
import { useAuthStore } from '@/stores/authStore';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const token = useAuthStore((state) => state.token);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export const publicRoutes = [
  {
    path: 'login',
    element: <Login />,
  },
];

export const protectedRoutes = [
  {
    element: (
      <AuthGuard>
        <ProtectedLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: '/',
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'master-gerbang',
        element: <MasterGerbang />,
      },
      {
        path: 'laporan-perhari',
        element: <LaporanPerHari />,
      },
    ],
  },
];

export const routes = [
  ...publicRoutes,
  ...protectedRoutes,
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
];
