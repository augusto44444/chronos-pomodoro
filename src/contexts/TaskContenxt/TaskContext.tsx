import { createContext } from 'react';
import { initialTaskState } from './initialTaskState';
import { TaskStateModel } from '../../models/taskStateModel';
import { TaskActionModel } from './taskAction';

type taskContextProps = {
  state: TaskStateModel;
  dispatch: React.Dispatch<TaskActionModel>;
};

const initialContextValue = {
  state: initialTaskState,
  dispatch: () => {},
};

export const TaskContenxt =
  createContext<taskContextProps>(initialContextValue);
