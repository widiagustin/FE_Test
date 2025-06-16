import { IconChevronRight, IconUser } from '@tabler/icons-react';
import logo from '/media/logoImg.svg';
import logoWithText from '/media/logoText.svg';
import { useNavigate } from 'react-router-dom';
import { ActionIcon, Box, Flex, Group, Menu } from '@mantine/core';
import { useAuthStore } from '@/stores/authStore';
import { useNavbarStore } from '@/stores/useNavbarStore';
import styles from '@/styles/components/header.module.scss';

export function Header() {
  const { isCollapsed, toggleNavbar } = useNavbarStore();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div className={styles.header}>
        <Group justify="space-between" w="100%">
          <Flex justify="space-between" align="center" w={isCollapsed ? 65 : 300}>
            <Flex
              w="100%"
              justify="center"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              <img alt="Jasa Marga" src={logo} style={{ width: 30 }} />
              {!isCollapsed && <img alt="Jasa Marga" src={logoWithText} style={{ width: 90 }} />}
            </Flex>
            <IconChevronRight
              className={styles.chevron}
              stroke={1.5}
              size={16}
              onClick={toggleNavbar}
              style={{ transform: isCollapsed ? 'rotate(90deg)' : 'none' }}
            />
          </Flex>
          {!isCollapsed && (
            <Box mr={20}>
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <ActionIcon variant="outline" radius="xl" size="lg" aria-label="User">
                    <IconUser style={{ width: '70%', height: '70%', stroke: '2' }} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Account</Menu.Label>
                  <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Box>
          )}
        </Group>
      </div>
    </>
  );
}
