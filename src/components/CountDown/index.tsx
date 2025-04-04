
import { useTaskContext } from '../../contexts/TaskContenxt/useTaskContext';
import styles from './styles.module.css';

export function CountDown() {
  const { state } = useTaskContext();
  const { container } = styles;
  return <div className={container}>{state.formattedSecondsRemaining}</div>;
}
