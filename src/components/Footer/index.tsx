import styles from './styles.module.css';

export function Footer() {
  const { footer } = styles;
  return (
    <footer className={footer}>
      <a href=''>Entenda como funciona a técnica pomodoro</a>
      <a href=''>
        Chronos Pomodoro &copy; {new Date().getFullYear()} - Feito com ❤
      </a>
    </footer>
  );
}
