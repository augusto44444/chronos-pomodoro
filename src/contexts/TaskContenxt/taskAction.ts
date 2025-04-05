import { TaskModel } from '../../models/task.model';

export enum TaskActionTypes {
  START_TASK = 'START_TASK',
  INTERRUPT_TASK = 'INTERRUPT_TASK',
  RESET_STATE = 'RESET_STATE',
}

type TaskActionWithPayload = {
  type: TaskActionTypes.START_TASK;
  payload: TaskModel;
};

type TaskActionWhithoutPayload =
  | {
      type: TaskActionTypes.INTERRUPT_TASK;
    }
  | {
      type: TaskActionTypes.RESET_STATE;
    };

export type TaskActionModel = TaskActionWithPayload | TaskActionWhithoutPayload;
