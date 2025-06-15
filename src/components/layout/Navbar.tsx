import { IconAdjustments, IconFileAnalytics, IconGauge } from '@tabler/icons-react';
import { ScrollArea } from '@mantine/core';
import { LinksGroup } from '@/components/organism/Navbar/LinksGroup';
import { useNavbarStore } from '@/stores/useNavbarStore';
import styles from '@/styles/components/navbar.module.scss';

const mockdata = [
  { label: 'Dashboard', icon: IconGauge, href: '/dashboard' },
  {
    label: 'Laporan Lalin',
    icon: IconFileAnalytics,
    initiallyOpened: true,
    links: [{ label: 'Laporan Per Hari', href: '/laporan-perhari' }],
  },
  { label: 'Master Gerbang', icon: IconAdjustments, href: '/master-gerbang' },
];

export function Navbar() {
  const { isCollapsed } = useNavbarStore();
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <>
      <nav className={`${styles.navbar} ${isCollapsed ? styles.collapsed : ''}`}>
        <ScrollArea className={styles.links}>
          <div className={styles.linksInner}>{links}</div>
        </ScrollArea>
      </nav>
    </>
  );
}
