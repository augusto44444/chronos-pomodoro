import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from 'lucide-react';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';

type AvailableThemes = 'dark' | 'light';

export function Menu() {
  const { menu, menuLink } = styles;

  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const storageTheme = localStorage.getItem('theme') as AvailableThemes;
    return storageTheme || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  function HandleThemeChange(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }

  const nextThemeIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />,
  }

  return (
    <nav className={menu}>
      <a
        href='#'
        className={menuLink}
        aria-label='ir para a home'
        title='ir para a home'
      >
        <HouseIcon />
      </a>
      <a
        href='#'
        className={menuLink}
        aria-label='ver historico'
        title='ver historico'
      >
        <HistoryIcon />
      </a>
      <a
        href='#'
        className={menuLink}
        aria-label='configurações'
        title='configurações'
      >
        <SettingsIcon />
      </a>
      <a
        href='#'
        className={menuLink}
        aria-label='alterar cor de tema'
        title='alterar cor de tema'
        onClick={e => HandleThemeChange(e)}
      >
        {nextThemeIcon[theme]}
      </a>
    </nav>
  );
}
