import { useContext } from 'react';
import { TaskContenxt } from './TaskContext';

export function useTaskContext() {
  return useContext(TaskContenxt);
}
