import { FC } from 'react';
import { Tabs } from '@mantine/core';
import { LalinCategory } from '@/types/lalin';
import { LALIN_TABS } from '@/utils/lalin';

interface LalinTabsProps {
  activeTab: LalinCategory;
  onTabChange: (value: string | null) => void;
}

export const LalinTabs: FC<LalinTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <Tabs value={activeTab} onChange={onTabChange} variant="default">
      <Tabs.List>
        {LALIN_TABS.map((tab, index) => (
          <Tabs.Tab key={index} value={tab.value}>
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  );
};
