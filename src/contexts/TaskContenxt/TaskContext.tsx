import { createContext } from 'react';
import { initialTaskState } from './initialTaskState';
import { TaskStateModel } from '../../models/taskStateModel';

type taskContextProps = {
  state: TaskStateModel;
  setState: React.Dispatch<React.SetStateAction<TaskStateModel>>;
};

const initialContextValue = {
  state: initialTaskState,
  setState: () => {},
};

export const TaskContenxt =
  createContext<taskContextProps>(initialContextValue);
