import { TimerIcon } from 'lucide-react';
import styles from './styles.module.css';

export function Logo() {
  const { logo, logoLink } = styles;
  return (
    <h1 className={logo}>
      <a href='#' className={logoLink}>
        <TimerIcon />
        <span>Chronos</span>
      </a>
    </h1>
  );
}
