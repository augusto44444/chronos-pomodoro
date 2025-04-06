import { BrowserRouter, Route, Routes } from 'react-router';
import { MessageContainer } from './components/MessagesContainer';
import { TaskContextProvider } from './contexts/TaskContenxt/TaskContextProvider';
import { Home } from './pages/Home';
import './styles/global.css';
import './styles/theme.css';
import { AboutPomodoro } from './pages/AboutPomodoro';
import { NotFound } from './pages/NotFound';

export function App() {
  return (
    <TaskContextProvider>
      <MessageContainer>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about-pomodoro' element={<AboutPomodoro />} />
            <Route path='' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </MessageContainer>
    </TaskContextProvider>
  );
}
