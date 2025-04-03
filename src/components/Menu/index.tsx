import { HistoryIcon, HouseIcon, SettingsIcon, SunIcon } from 'lucide-react';
import styles from './styles.module.css';

export function Menu() {
  const { menu, menuLink } = styles;
  return (
    <nav className={menu}>
      <a href='#' className={menuLink}>
        <HouseIcon />
      </a>
      <a href='#' className={menuLink}>
        <HistoryIcon />
      </a>
      <a href='#' className={menuLink}>
        <SettingsIcon />
      </a>
      <a href='#' className={menuLink}>
        <SunIcon />
      </a>
    </nav>
  );
}
