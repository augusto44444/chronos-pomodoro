import { TimerIcon } from 'lucide-react';
import styles from './styles.module.css';
import { RouterLink } from '../RouterLink';

export function Logo() {
  const { logo, logoLink } = styles;
  return (
    <h1 className={logo}>
      <RouterLink href='/' className={logoLink}>
        <TimerIcon />
        <span>Chronos</span>
      </RouterLink>
    </h1>
  );
}
