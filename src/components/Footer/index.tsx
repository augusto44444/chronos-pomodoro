import { Link } from 'react-router';
import styles from './styles.module.css';

export function Footer() {
  const { footer } = styles;
  return (
    <footer className={footer}>
      <Link to='/about'>Entenda como funciona a técnica pomodoro</Link>
      <Link to="/">
        Chronos Pomodoro &copy; {new Date().getFullYear()} - Feito com ❤
      </Link>
    </footer>
  );
}
