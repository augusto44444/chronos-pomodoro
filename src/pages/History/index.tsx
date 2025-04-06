import { TrashIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DeffaultButton } from '../../components/DefaultButton';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';

import styles from './style.module.css';

export function History() {
  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>History</span>
          <span className={styles.buttonContainer}>
            <DeffaultButton
              aria-label='Limpar histórico'
              title='Apagar histórico'
              icon={<TrashIcon />}
              color='red'
            />
          </span>
        </Heading>
      </Container>
      <Container>
        <div className={styles.responsiveTable}>
          <table>
            <thead>
              <tr>
                <th>Tarefa</th>
                <th>Duração</th>
                <th>Data</th>
                <th>Status</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 20 }).map((_, index) => (
                <tr key={index}>
                  <td>Estudar</td>
                  <td>25 min</td>
                  <td>05/04/2025</td>
                  <td>Completa</td>
                  <td>Foco</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </MainTemplate>
  );
}
