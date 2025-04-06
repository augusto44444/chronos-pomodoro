import { TaskModel } from '../models/task.model';

export function getTaskStatus(task: TaskModel, activeTask: TaskModel | null) {
  if (task.interruptDate) {
    return 'Interrompida';
  }

  if (task.completeDate) {
    return 'Completa';
  }

  if (task.id === activeTask?.id) {
    return 'Em Progresso';
  }
  return 'Abandonada';
}
