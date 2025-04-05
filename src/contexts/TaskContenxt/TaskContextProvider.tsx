import { useReducer } from 'react';
import { initialTaskState } from './initialTaskState';
import { TaskContenxt } from './TaskContext';
import { TaskReducer } from './taskReducer';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(TaskReducer, initialTaskState);

  return (
    <TaskContenxt.Provider value={{ state, dispatch }}>
      {children}
    </TaskContenxt.Provider>
  );
}
