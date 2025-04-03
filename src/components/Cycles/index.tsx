import styles from './styles.module.css';

export function Cycles() {
  const { cycles, cycleDots, cycleDot, workTime, shortBreakTime, LongBreakTime } = styles;
  return (
    <div className={cycles}>
      <span>Ciclos: </span>

      <div className={cycleDots}>
        <span className={`${cycleDot} ${workTime}`}></span>
        <span className={`${cycleDot} ${shortBreakTime}`}></span>
        <span className={`${cycleDot} ${workTime}`}></span>
        <span className={`${cycleDot} ${shortBreakTime}`}></span>
        <span className={`${cycleDot} ${workTime}`}></span>
        <span className={`${cycleDot} ${shortBreakTime}`}></span>
        <span className={`${cycleDot} ${workTime}`}></span>
        <span className={`${cycleDot} ${LongBreakTime}`}></span>
      </div>
    </div>
  );
}
