import gravitationalBeep from '../assets/audio/gravitational_beep.mp3';

export function loadBeep() {
  const audio = new Audio(gravitationalBeep);

  return () => {
    audio.currentTime = 0;
    audio.play().catch(error => {
      console.error('Error playing beep sound:', error);
    });
  };
}
