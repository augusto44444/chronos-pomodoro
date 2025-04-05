import { useEffect, useReducer } from 'react';
import { initialTaskState } from './initialTaskState';
import { TaskContenxt } from './TaskContext';
import { TaskReducer } from './taskReducer';
import { TimerWorkerManager } from '../../workers/timerWorkerManager';
import { TaskActionTypes } from './taskAction';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(TaskReducer, initialTaskState);

  const worker = TimerWorkerManager.getInstance();

  worker.onmessage((e: MessageEvent) => {
    const countDownSeconds = e.data;
    console.log(e.data);

    if (countDownSeconds <= 0) {
      dispatch({
        type: TaskActionTypes.COMPLETE_TASK,
      });
      console.log(state)
      worker.terminate();
    } else {
      dispatch({
        type: TaskActionTypes.COUNT_DOWN,
        payload: { secondsRemaining: countDownSeconds },
      });
    }
    console.log(state)
  });

  useEffect(() => {
    if (!state.activeTask) {
      console.log('worker finalizado por nao haver task ativa');
      worker.terminate();
    }

    worker.postMessage(state);
  }, [state, worker]);

  return (
    <TaskContenxt.Provider value={{ state, dispatch }}>
      {children}
    </TaskContenxt.Provider>
  );
}
