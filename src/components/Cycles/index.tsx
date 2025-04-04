import { useTaskContext } from '../../contexts/TaskContenxt/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import styles from './styles.module.css';

export function Cycles() {
  const { cycles, cycleDots, cycleDot } = styles;

  const { state } = useTaskContext();

  const cycleSteps = Array.from({ length: state.currentCycle });

  const cycleDescriptionMap = {
    workTime: 'foco',
    shortBreakTime: 'descanso curto',
    longBreakTime: 'descanso longo',
  };

  return (
    <div className={cycles}>
      <span>Ciclos: </span>

      <div className={cycleDots}>
        {cycleSteps.map((_, index) => {
          const nextCycle = getNextCycle(index);
          const nextCycleType = getNextCycleType(nextCycle);
          return (
            <span
              className={`${cycleDot} ${styles[nextCycleType]}`}
              aria-label={`Indicador de ${cycleDescriptionMap[nextCycleType]}`}
              title={`Indicador de ciclo de ${cycleDescriptionMap[nextCycleType]}`}
              key={`${nextCycleType}-${nextCycle}`}
            ></span>
          );
        })}
      </div>
    </div>
  );
}
