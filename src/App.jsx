import { useState } from 'react';
import Home from './Components/Home';
import DataPage from './Components/DataPage';
import Loading from './Components/Message';
import ReportPage from './Components/Relatorio';
import GlobalStyles from './globalStyles';

const App = () => {
    
    const [currentScreen, setCurrentScreen] = useState('home');
    // eslint-disable-next-line no-unused-vars
    const [formData, setFormData] = useState(null);
    const [report, setReport] = useState(null);

    const handleStart = () => setCurrentScreen('data');

    const handleSubmit = async (data) => {
        setFormData(data);
        setCurrentScreen('loading');

        // Simular geração de relatório
        setTimeout(() => {
            const mockReport = {
                ...data,
                recommendations: [
                    'Durma sempre no mesmo horário.',
                    'Evite eletrônicos antes de dormir.',
                    'Consuma alimentos leves à noite.',
                ],
            };
            setReport(mockReport);
            setCurrentScreen('report');
        }, 3000);
    };
    <GlobalStyles />
    if (currentScreen === 'home') return <Home onStart={handleStart} />;
    if (currentScreen === 'data') return <DataPage onSubmit={handleSubmit} />;
    if (currentScreen === 'loading') return <Loading />;
    if (currentScreen === 'report') return <ReportPage report={report} />;

    return null;
};

export default App;
