import { TrashIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';

import styles from './style.module.css';
import { useTaskContext } from '../../contexts/TaskContenxt/useTaskContext';
import { formatDate } from '../../utils/formatDate';
import { getTaskStatus } from '../../utils/getTaskStatus';
import { sortTasks, SortTasksOptions } from '../../utils/sortTasks';
import { useEffect, useState } from 'react';
import { TaskActionTypes } from '../../contexts/TaskContenxt/taskAction';
import { toastMessageAdapter } from '../../adapters/toastMessageAdapter';

export function History() {
  const { state, dispatch } = useTaskContext();
  const hasTasks = state.tasks.length > 0;
  const [confirmClearHistory, setConfirmClearHistory] = useState(false);
  const [sortedTasksOptions, setSortedTasksOptions] =
    useState<SortTasksOptions>(() => {
      return {
        tasks: sortTasks({
          tasks: state.tasks,
        }),
        direction: 'desc',
        field: 'startDate',
      };
    });

  useEffect(() => {
    if (!confirmClearHistory) return;

    setConfirmClearHistory(false);

    dispatch({ type: TaskActionTypes.RESET_STATE });
  }, [confirmClearHistory, dispatch]);

  useEffect(() => {
    return () => {
      toastMessageAdapter.dismiss();
    };
  }, []);

  useEffect(() => {
    setSortedTasksOptions(prevSortState => ({
      ...prevSortState,
      tasks: sortTasks({
        tasks: state.tasks,
        direction: prevSortState.direction,
        field: prevSortState.field,
      }),
    }));
  }, [state.tasks]);

  function handleSortTasks({ field }: Pick<SortTasksOptions, 'field'>) {
    const newDirection =
      sortedTasksOptions.direction === 'asc' ? 'desc' : 'asc';
    setSortedTasksOptions({
      tasks: sortTasks({
        direction: newDirection,
        field,
        tasks: sortedTasksOptions.tasks,
      }),
      direction: newDirection,
      field,
    });
  }

  function handleResetHistory() {
    toastMessageAdapter.dismiss();
    toastMessageAdapter.confirm('Tem certeza?', confirmation => {
      setConfirmClearHistory(confirmation);
    });
  }

  const taskTypeMap = {
    workTime: 'Foco',
    shortBreakTime: 'Descanso Curto',
    longBreakTime: 'Descanso Longo',
  };

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>History</span>
          {hasTasks && (
            <span className={styles.buttonContainer}>
              <DefaultButton
                aria-label='Limpar histórico'
                title='Apagar histórico'
                icon={<TrashIcon />}
                color='red'
                onClick={handleResetHistory}
              />
            </span>
          )}
        </Heading>
      </Container>
      <Container>
        {hasTasks && (
          <div className={styles.responsiveTable}>
            <table>
              <thead>
                <tr>
                  <th
                    className={styles.thsort}
                    onClick={() => handleSortTasks({ field: 'name' })}
                  >
                    Tarefa ↕
                  </th>
                  <th
                    className={styles.thsort}
                    onClick={() => handleSortTasks({ field: 'duration' })}
                  >
                    Duração ↕
                  </th>
                  <th
                    className={styles.thsort}
                    onClick={() => handleSortTasks({ field: 'startDate' })}
                  >
                    Data ↕
                  </th>
                  <th>Status</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {sortedTasksOptions.tasks.map(task => (
                  <tr key={task.id}>
                    <td>{task.name}</td>
                    <td>{task.duration}</td>
                    <td>{formatDate(task.startDate)}</td>
                    <td>{getTaskStatus(task, state.activeTask)}</td>
                    <td>{taskTypeMap[task.type]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {!hasTasks && (
          <div className={styles.emptyState}>
            <p>Você ainda não tem tarefas registradas.</p>
            <p>Quando você criar uma tarefa, ela aparecerá aqui.</p>
          </div>
        )}
      </Container>
    </MainTemplate>
  );
}
