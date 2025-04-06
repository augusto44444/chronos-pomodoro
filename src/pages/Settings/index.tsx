import { SaveIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { DefaultInput } from '../../components/DefaultInput';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import { useRef } from 'react';
import { useTaskContext } from '../../contexts/TaskContenxt/useTaskContext';
import { toastMessageAdapter } from '../../adapters/toastMessageAdapter';
import { TaskActionTypes } from '../../contexts/TaskContenxt/taskAction';

export function Settings() {
  const { state, dispatch } = useTaskContext();

  const workTimeInputRef = useRef<HTMLInputElement>(null);
  const shortBreakInputRef = useRef<HTMLInputElement>(null);
  const longBreakInputRef = useRef<HTMLInputElement>(null);

  function handleSaveSettingsSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    toastMessageAdapter.dismiss();
    const formErros = [];
    const workTime = Number(workTimeInputRef.current?.value);
    const shortBreakTime = Number(shortBreakInputRef.current?.value);
    const longBreakTime = Number(longBreakInputRef.current?.value);

    if (isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
      formErros.push('Preencha todos os campos com apenas números.');
    }

    if (!workTime || !shortBreakTime || !longBreakTime) {
      formErros.push('Preencha todos os campos corretamente.');
    }

    if (workTime < 1 || workTime > 99) {
      formErros.push(
        'O tempo de foco deve ser maior que 0 e menor que 100 minutos.',
      );
    }

    if (shortBreakTime < 1 || shortBreakTime > 30) {
      formErros.push(
        'O tempo de descanso curto deve ser maior que 0 e menor que 30 minutos.',
      );
    }

    if (longBreakTime < 1 || longBreakTime > 60) {
      formErros.push(
        'O tempo de descanso longo deve ser maior que 0 e menor que 60 minutos.',
      );
    }

    if (formErros.length > 0) {
      formErros.forEach(error => {
        toastMessageAdapter.error(error);
      });
      return;
    }

    dispatch({
      type: TaskActionTypes.CHANGE_SETTINGS,
      payload: {
        workTime,
        shortBreakTime,
        longBreakTime,
      },
    });
    toastMessageAdapter.success('Configurações salvas com sucesso!');
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>Configurações</Heading>
      </Container>
      <Container>
        <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
          Modifique as configuraçôes para o tempo de foco, descanso curto e
          descanso longo
        </p>
      </Container>

      <Container>
        <form onSubmit={handleSaveSettingsSubmit} action='' className='form'>
          <div className='formRow'>
            <DefaultInput
              id='workTime'
              labelText='foco'
              ref={workTimeInputRef}
              defaultValue={state.config.workTime}
              type='number'
            />
          </div>
          <div className='formRow'>
            <DefaultInput
              id='shortBreakTime'
              labelText='descanso curto'
              ref={shortBreakInputRef}
              defaultValue={state.config.shortBreakTime}
              type='number'
            />
          </div>
          <div className='formRow'>
            <DefaultInput
              id='longBreakTime'
              labelText='descanso longo'
              ref={longBreakInputRef}
              defaultValue={state.config.longBreakTime}
              type='number'
            />
          </div>
          <div className='formRow'>
            <DefaultButton
              icon={<SaveIcon />}
              aria-label='Salvar configurações'
              title='Salvar configurações'
            />
          </div>
        </form>
      </Container>
    </MainTemplate>
  );
}
