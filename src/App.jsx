import { useState } from 'react';
import Home from './Components/Home';
import DataPage from './Components/DataPage';

import CiclosDeSonoPage from './Components/CiclosDeSonoPage';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  // eslint-disable-next-line no-unused-vars
  const [formData, setFormData] = useState(null);
  const [report, setReport] = useState(null);

  const handleStart = () => setCurrentScreen('data');

  const handleSubmit = (data) => {
    setFormData(data);
    setCurrentScreen('loading');

    // Gerando um relatório baseado nos dados do usuário
    const newReport = generateSleepReport(data);
    setReport(newReport);
    setCurrentScreen('report');
  };

  const generateSleepReport = (data) => {
    const { age, workHours, sleepHours } = data;

    // Lógica simples para gerar um plano com base nos dados
    let recommendedPlan = '';

    if (age < 25) {
      if (sleepHours < 8) {
        recommendedPlan = 'Recomendamos aumentar suas horas de sono para pelo menos 8 horas por noite.';
      } else {
        recommendedPlan = 'Você está dormindo o suficiente, continue assim!';
      }
    } else if (age >= 25 && age <= 40) {
      if (sleepHours < 7) {
        recommendedPlan = 'É importante priorizar o sono, tente dormir pelo menos 7 horas por noite.';
      } else {
        recommendedPlan = 'Você tem uma boa quantidade de sono, mantenha a rotina!';
      }
    } else {
      if (sleepHours < 7) {
        recommendedPlan = 'Aos 40 anos ou mais, o sono adequado é crucial para a saúde. Tente dormir no mínimo 7 horas por noite.';
      } else {
        recommendedPlan = 'Excelente! Continue mantendo essa boa quantidade de sono.';
      }
    }

    // Considera a carga horária de trabalho para ajustar a recomendação
    if (workHours > 8) {
      recommendedPlan += ' Como você tem uma carga de trabalho alta, seu corpo precisa de mais descanso. Considere melhorar a qualidade do seu sono.';
    }

    return {
      name: data.name,
      age: data.age,
      workHours: data.workHours,
      sleepHours: data.sleepHours,
      plan: recommendedPlan,
    };
  };

  if (currentScreen === 'home') return <Home onStart={handleStart} />;
  if (currentScreen === 'data') return <DataPage onSubmit={handleSubmit} />;
  if (currentScreen === 'loading') return <div>Gerando seu relatório...</div>;
  if (currentScreen === 'report') return <CiclosDeSonoPage report={report} />;

  return null;
};

export default App;
