import styled from "styled-components";
import { Bar, Pie } from "react-chartjs-2";
import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom"; // Importe o useNavigate para redirecionamento

// Registre as escalas e outros componentes necessários
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const GlobalStyle = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
`;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const MainContent = styled.div`

  flex: 1;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  
`;

const ChartContainer = styled.div`
  margin-top: 1.5rem;
`;

const Button = styled.button`
  display: flex;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1.5rem;
  transition: background-color 0.3s ease;
  align-items: center;
  width: 200px;
  height: auto;
  justify-content: center;
  margin-left: 90px;


  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const dataBar = {
  labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
  datasets: [
    {
      label: "Horas de Sono",
      data: [7, 6, 8, 7.5, 6.5, 8, 9],
      backgroundColor: "#1E90FF",
    },
  ],
};

const dataPie = {
  labels: ["Sono Adequado", "Sono Insuficiente"],
  datasets: [
    {
      label: "Horas de Sono",
      data: [5, 2], // Exemplo: 5 dias com sono adequado, 2 dias com sono insuficiente
      backgroundColor: ["#1E90FF", "#FF6384"],
    },
  ],
};

const optionsBar = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Horas de Sono por Dia",
    },
  },
};

const optionsPie = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Distribuição do Sono",
    },
  },
};

const Dashboard = () => {
  const isMobile = window.innerWidth < 768; // Verifica se a tela é menor que 768px
  const navigate = useNavigate(); // Hook para redirecionamento

  const handleFormButtonClick = () => {
    navigate("/form"); // Redireciona para a página do formulário
  };

  return (
    <>
    <GlobalStyle/>
      <DashboardContainer>
        <Sidebar />
        <MainContent>
          <h2>Seu Progresso:</h2>
          <ChartContainer>
            {isMobile ? (
              <Pie data={dataPie} options={optionsPie} />
            ) : (
              <Bar data={dataBar} options={optionsBar} />
            )}
          </ChartContainer>
          <Button onClick={handleFormButtonClick}>Ir para o Formulário</Button>
        </MainContent>
      </DashboardContainer>
      <Footer />
    </>
  );
};

export default Dashboard;