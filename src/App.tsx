import { MessageContainer } from './components/MessagesContainer';
import { TaskContextProvider } from './contexts/TaskContenxt/TaskContextProvider';
import { MainRouter } from './routers/MainRouter';
import './styles/global.css';
import './styles/theme.css';

export function App() {
  return (
    <TaskContextProvider>
      <MessageContainer>
        <MainRouter />
      </MessageContainer>
    </TaskContextProvider>
  );
}
