import { TaskModel } from '../models/task.model';

export function getNextCycleType(currentCycle: number): TaskModel['type'] {
  if (currentCycle % 8 === 0) return 'longBreakTime';
  return currentCycle % 2 === 0 ? 'shortBreakTime' : 'workTime';
}
