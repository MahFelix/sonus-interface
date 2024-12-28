/* eslint-disable react/prop-types */
import { useState } from 'react';
import styled from 'styled-components';

// Container para os cards
const CiclosContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
`;

// Card com animações e nova paleta de cores
const Card = styled.div`
  background-color: #f7f8fa; /* Cor de fundo suave */
  color: #333;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 280px;
  padding: 25px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
  }
`;

// Título dos cards
const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #4caf50; /* Verde */
  font-weight: 600;
`;

// Texto do card
const Text = styled.p`
  font-size: 1rem;
  color: #555;
  line-height: 1.5;
  margin-bottom: 15px;
`;

// Container do relatório com bordas e sombras sutis
const ReportContainer = styled.div`
  padding: 25px;
  max-width: 700px;
  margin: 40px auto;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

// Itens do relatório
const ReportItem = styled.p`
  font-size: 1rem;
  margin-bottom: 12px;
  color: #444;
`;

// Título do relatório com destaque
const ReportTitle = styled.h2`
  color: #4caf50;
  font-size: 1.8rem;
  margin-bottom: 20px;
`;

// Componente principal CiclosDeSonoPage
const CiclosDeSonoPage = ({ formData = {} }) => {
  const { age, workHours, sleepHours } = formData;
  const [selectedCycle, setSelectedCycle] = useState(null);

  // Funções que retornam as dicas de rotina com base nos dados do usuário
  const getRoutine = (cycle) => {
    switch (cycle) {
      case 'Cycle1':
        return `Baseado nas suas informações, recomendamos:
        - Tente dormir mais cedo, entre 22:00 e 23:00.
        - Evite o uso de telas ao menos 30 minutos antes de dormir.
        - Mantenha um ambiente tranquilo e escuro.
        - Como você tem uma carga de trabalho alta (${workHours} horas), priorize o descanso.`;
      case 'Cycle2':
        return `Com base nas suas informações, sugerimos:
        - Acorde e durma sempre no mesmo horário.
        - Utilize técnicas de relaxamento, como meditação antes de dormir.
        - Evite refeições pesadas à noite.
        - Mantenha a consistência no horário de sono (mínimo de 7 horas).`;
      case 'Cycle3':
        return `Para melhorar sua qualidade de sono, faça o seguinte:
        - Faça exercícios moderados durante o dia, mas evite exercícios intensos antes de dormir.
        - Crie uma rotina relaxante antes de deitar (leitura, música suave).
        - Evite café ou bebidas com cafeína após as 16:00.
        - Como você é mais jovem (${age < 25}), priorize 8 horas de sono.`;
      case 'Cycle4':
        return `Aos ${age} anos, suas necessidades de sono podem mudar. Recomendamos:
        - Dormir no mínimo 7 horas por noite para manter a saúde.
        - Priorizar a qualidade do sono: evite estresse antes de dormir.
        - Use um travesseiro adequado para garantir uma boa postura durante o sono.`;
      default:
        return '';
    }
  };

  // Função para gerar o relatório
  const generateReport = () => {
    return {
      name: formData.name,
      age: formData.age,
      workHours: formData.workHours,
      sleepHours: formData.sleepHours,
      plan: selectedCycle ? getRoutine(selectedCycle) : 'Selecione um ciclo para ver as recomendações.'
    };
  };

  return (
    <div>
      <ReportContainer>
        <ReportTitle>Relatório de Sono</ReportTitle>
        <ReportItem><strong>Nome:</strong> {formData.name}</ReportItem>
        <ReportItem><strong>Idade:</strong> {formData.age}</ReportItem>
        <ReportItem><strong>Carga Horária de Trabalho:</strong> {formData.workHours} horas</ReportItem>
        <ReportItem><strong>Horas de Sono Desejadas:</strong> {formData.sleepHours} horas</ReportItem>
        <ReportItem><strong>Recomendações:</strong></ReportItem>
        <ReportItem>{generateReport().plan}</ReportItem>
      </ReportContainer>

      <Title>Ciclos de Sono</Title>
      <CiclosContainer>
        <Card onClick={() => setSelectedCycle('Cycle1')}>
          <Title>Ciclo 1: Sono Restaurador</Title>
          <Text>{getRoutine('Cycle1')}</Text>
        </Card>
        <Card onClick={() => setSelectedCycle('Cycle2')}>
          <Title>Ciclo 2: Rotina Regular</Title>
          <Text>{getRoutine('Cycle2')}</Text>
        </Card>
        <Card onClick={() => setSelectedCycle('Cycle3')}>
          <Title>Ciclo 3: Sono Jovem</Title>
          <Text>{getRoutine('Cycle3')}</Text>
        </Card>
        <Card onClick={() => setSelectedCycle('Cycle4')}>
          <Title>Ciclo 4: Sono Maduro</Title>
          <Text>{getRoutine('Cycle4')}</Text>
        </Card>
      </CiclosContainer>
    </div>
  );
};

export default CiclosDeSonoPage;
