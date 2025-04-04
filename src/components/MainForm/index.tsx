import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DeffaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { useRef } from 'react';
import { TaskModel } from '../../models/task.model';
import { useTaskContext } from '../../contexts/TaskContenxt/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { formatSecondsToMinutes } from '../../utils/formatSecondsToMinutes';

export function MainForm() {
  const { state, setState } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleCreateNewTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!taskNameInput.current) return;

    const taskName = taskNameInput.current.value.trim();
    if (!taskName) {
      alert('Digite o nome da tarefa');
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };

    const secondsRemaining = newTask.duration * 60;

    setState(prev => ({
      ...prev,
      tasks: [...prev.tasks, newTask],
      activeTask: newTask,
      currentCycle: nextCycle, //conferir dps
      secondsRemaining,
      formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
      config: { ...prev.config },
    }));
  }

  function handleInterruptTask(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();
    setState(prev => ({
      ...prev,
      activeTask: null,
      secondsRemaining: 0,
      formattedSecondsRemaining: '00:00',
      tasks: prev.tasks.map(task => {
        if (task.id === prev.activeTask?.id) {
          return {
            ...task,
            interruptDate: Date.now(),
          };
        }
        return task;
      }),
    }));
  }

  return (
    <form onSubmit={handleCreateNewTask} action='' className='form'>
      <div className='formRow'>
        <DefaultInput
          labelText='Task'
          type='text'
          id='meuInput'
          placeholder='digite algo'
          ref={taskNameInput}
          disabled={!!state.activeTask}
        />
      </div>

      <div className='formRow'>
        <p>{`O próximo intervalo é em ${
          state.secondsRemaining / 60
        } minutos`}</p>
      </div>

      {state.currentCycle > 0 && (
        <div className='formRow'>
          <Cycles />
        </div>
      )}

      <div className='formRow'>
        {!state.activeTask ? (
          <DeffaultButton
            aria-label='Iniciar nova tarefa'
            title='Iniciar nova tarefa'
            type='submit'
            color='green'
            icon={<PlayCircleIcon />}
            key='botao_submit'
          />
        ) : (
          <DeffaultButton
            aria-label='Parar tarefa'
            title='Parar tarefa'
            type='button'
            color='red'
            onClick={handleInterruptTask}
            icon={<StopCircleIcon />}
            key='botao_button'
          />
        )}
      </div>
    </form>
  );
}
