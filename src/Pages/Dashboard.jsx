import { useEffect, useState } from "react";
import styled from "styled-components";
import { Bar, Pie } from "react-chartjs-2";
import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Registre as escalas e outros componentes necessários
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const GlobalStyle = styled.div`
font-family: "Quicksand", sans-serif;
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

const Dashboard = () => {
  const isMobile = window.innerWidth < 768;
  const navigate = useNavigate();
  const [sleepData, setSleepData] = useState([]);

  useEffect(() => {
    const fetchSleepData = async () => {
      try {
        const response = await axios.get("http://localhost:8090/api/sleep");
        setSleepData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados de sono:", error);
      }
    };

    fetchSleepData();
  }, []);

  // Configuração do gráfico de barras
  const dataBar = {
    labels: sleepData.map((entry) => new Date(entry.createdAt).toLocaleDateString()),
    datasets: [
      {
        label: "Plano de Sono",
        data: sleepData.map((entry) => entry.plan.length), // Exemplo: usar o tamanho do plano como dado
        backgroundColor: "#1E90FF",
      },
    ],
  };

  // Configuração do gráfico de pizza
  const dataPie = {
    labels: ["Sono Adequado", "Sono Insuficiente"],
    datasets: [
      {
        label: "Distribuição do Sono",
        data: [5, 2], // Exemplo: 5 dias com sono adequado, 2 dias com sono insuficiente
        backgroundColor: ["#1E90FF", "#FF6384"],
      },
    ],
  };

  // Opções para o gráfico de barras
  const optionsBar = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Plano de Sono por Dia",
      },
    },
  };

  // Opções para o gráfico de pizza
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

  const handleFormButtonClick = () => {
    navigate("/form");
  };

  return (
    <>
      <GlobalStyle />
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