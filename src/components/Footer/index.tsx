import styles from './styles.module.css';
import { RouterLink } from '../RouterLink';

export function Footer() {
  const { footer } = styles;
  return (
    <footer className={footer}>
      <RouterLink href='/about'>
        Entenda como funciona a técnica pomodoro
      </RouterLink>
      <RouterLink href='/'>
        Chronos Pomodoro &copy; {new Date().getFullYear()} - Feito com ❤
      </RouterLink>
    </footer>
  );
}
