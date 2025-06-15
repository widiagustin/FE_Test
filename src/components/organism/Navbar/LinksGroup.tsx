import { useState } from 'react';
import classes from './NavbarLinksGroup.module.scss';
import { IconChevronRight } from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Group, rem, Text, Tooltip, UnstyledButton } from '@mantine/core';
import { useNavbarStore } from '@/stores/useNavbarStore';

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; href: string }[];
  href?: string;
}

export function LinksGroup({ icon: Icon, label, initiallyOpened, links, href }: LinksGroupProps) {
  const { isCollapsed, toggleNavbar } = useNavbarStore();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const location = useLocation();
  const navigate = useNavigate();

  const items = (hasLinks ? links : []).map((link) => (
    <Text<'a'>
      component="a"
      className={`${classes.link} ${location.pathname === link.href ? classes.active : ''}`}
      href={link.href}
      key={link.label}
      onClick={(event) => {
        event.preventDefault();
        navigate(link.href);
      }}
      style={{ display: isCollapsed ? 'none' : 'block' }}
    >
      {link.label}
    </Text>
  ));

  const handleClickMenu = () => {
    if (href) {
      navigate(href);
    } else {
      if (isCollapsed) {
        toggleNavbar();
      }
      setOpened(!opened);
    }
  };

  const buttonContent = (
    <UnstyledButton
      onClick={handleClickMenu}
      className={`${classes.control} ${location.pathname === href ? classes.active : ''}`}
      style={{ justifyItems: isCollapsed ? 'center' : 'normal' }}
    >
      <Group justify="space-between" gap={0} style={{ flex: 1 }}>
        <Group gap={0}>
          <Icon style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          {!isCollapsed && (
            <Text ml="md" fw={500} size="sm">
              {label}
            </Text>
          )}
        </Group>
        {hasLinks && !isCollapsed && (
          <IconChevronRight
            className={classes.chevron}
            stroke={1.5}
            size={16}
            style={{ transform: opened ? 'rotate(-90deg)' : 'none' }}
          />
        )}
      </Group>
    </UnstyledButton>
  );

  return (
    <>
      {isCollapsed ? (
        <Tooltip
          label={label}
          position="right"
          transitionProps={{ transition: 'fade', duration: 200 }}
        >
          {buttonContent}
        </Tooltip>
      ) : (
        buttonContent
      )}
      {hasLinks && !isCollapsed && opened ? <div className={classes.links}>{items}</div> : null}
    </>
  );
}
