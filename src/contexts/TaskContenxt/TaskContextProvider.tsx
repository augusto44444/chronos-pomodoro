import { useEffect, useReducer, useRef } from 'react';
import { initialTaskState } from './initialTaskState';
import { TaskContenxt } from './TaskContext';
import { TaskReducer } from './taskReducer';
import { TimerWorkerManager } from '../../workers/timerWorkerManager';
import { TaskActionTypes } from './taskAction';
import { loadBeep } from '../../utils/loadBeep';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(TaskReducer, initialTaskState);
  const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);

  const worker = TimerWorkerManager.getInstance();

  worker.onmessage((e: MessageEvent) => {
    const countDownSeconds = e.data;

    if (countDownSeconds <= 0) {
      if (playBeepRef.current) {
        playBeepRef.current();
        playBeepRef.current = null;
      }

      dispatch({
        type: TaskActionTypes.COMPLETE_TASK,
      });
      worker.terminate();

    } else {
      dispatch({
        type: TaskActionTypes.COUNT_DOWN,
        payload: { secondsRemaining: countDownSeconds },
      });
    }
  });

  useEffect(() => {
    if (!state.activeTask) {
      worker.terminate();
    }

    worker.postMessage(state);
  }, [state, worker]);

  useEffect(() => {
    if (state.activeTask && playBeepRef.current === null) {
      playBeepRef.current = loadBeep();
    } else {
      playBeepRef.current = null;
    }
  }, [state.activeTask]);

  return (
    <TaskContenxt.Provider value={{ state, dispatch }}>
      {children}
    </TaskContenxt.Provider>
  );
}
