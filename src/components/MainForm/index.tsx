import { PlayCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DeffaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';

export function MainForm() {
  return (
    <form action='' className='form'>
      <div className='formRow'>
        <DefaultInput
          labelText='Task'
          type='text'
          id='meuInput'
          placeholder='digite algo'
        />
      </div>

      <div className='formRow'>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>

      <div className='formRow'>
        <Cycles />
      </div>

      <div className='formRow'>
        <DeffaultButton color='green' icon={<PlayCircleIcon />} />
      </div>
    </form>
  );
}
