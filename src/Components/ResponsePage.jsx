/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Footer from "../Components/Footer";
import axios from "axios";
import DOMPurify from "dompurify";
import { jsPDF } from "jspdf";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import Header from "./Header";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

// Registra os componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// Animação de fade-in
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Estilos globais para a fonte Quicksand
const GlobalStyle = styled.div`
  font-family: "Quicksand", sans-serif;
  position: relative;
  min-height: 100vh;
  background-color: #0a0a23; /* Fundo escuro para o tema espacial */
`;

// Contêiner principal do dashboard
const DashboardContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  color: white;
  position: relative;
  z-index: 1; /* Garante que o conteúdo fique acima do fundo estrelado */
`;

// Card para exibir o plano de sono
const PlanCard = styled.div`
  background-color: rgba(0, 0, 0, 0.8); /* Fundo semi-transparente */
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  text-align: left;
  border: solid 2px #00bcd4; /* Borda azul moderna */
  animation: ${fadeIn} 0.5s ease-in-out;
`;

// Texto do plano de sono
const PlanText = styled.div`
  white-space: pre-wrap;
  line-height: 1.6;
  font-size: 1rem;
  max-height: 400px;
  overflow-y: auto;
  scroll-behavior: smooth;

  /* Estilizando a barra de rolagem */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #00bcd4;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #0097a7;
  }
`;

// Botões de ação
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 2rem;
  margin-bottom: 5rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #00bcd4; /* Azul moderno */
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #0097a7; /* Azul mais escuro no hover */
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

// Gráfico de barras
const ChartContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

// Gráfico de pizza
const PieChartContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

// Fundo estrelado
const StarBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
`;

// Spinner de carregamento
const LoadingSpinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #00bcd4;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ResponsePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(true);

  // Dados fictícios para o gráfico de barras
  const barChartData = {
    labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
    datasets: [
      {
        label: "Horas de Sono",
        data: [7, 6, 8, 7.5, 6.5, 8, 9],
        backgroundColor: "#00bcd4",
        borderColor: "#0097a7",
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Horas de Sono na Semana",
        color: "white",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "white",
        },
      },
      x: {
        ticks: {
          color: "white",
        },
      },
    },
  };

  // Dados fictícios para o gráfico de pizza
  const pieChartData = {
    labels: ["Sono Profundo", "Sono Leve", "REM"],
    datasets: [
      {
        label: "Distribuição do Sono",
        data: [60, 30, 10],
        backgroundColor: ["#00bcd4", "#0097a7", "#00796b"],
        borderColor: ["#fff", "#fff", "#fff"],
        borderWidth: 1,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white",
        },
      },
      title: {
        display: true,
        text: "Distribuição do Sono",
        color: "white",
      },
    },
  };

  useEffect(() => {
    if (location.state && location.state.response) {
      const responseData = location.state.response;

      let generatedText = "";
      if (typeof responseData === "string") {
        generatedText = responseData;
      } else if (
        responseData.candidates &&
        responseData.candidates[0]?.content?.parts[0]?.text
      ) {
        generatedText = responseData.candidates[0].content.parts[0].text;
      } else {
        generatedText = "Resposta inválida recebida da API.";
      }

      // Sanitiza o conteúdo antes de renderizar
      const formattedResponse = DOMPurify.sanitize(
        generatedText
          .replace(/\n/g, "<br>")
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      );

      setResponse(formattedResponse);
      setLoading(false);
    } else {
      setResponse("Nenhuma resposta encontrada.");
      setLoading(false);
    }
  }, [location.state]);

  // Função para baixar o texto em PDF
  const handleDownloadPDF = () => {
    const plainText = response
      .replace(/<br\s*\/?>/g, "\n")
      .replace(/<[^>]+>/g, "");

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    const maxWidth = pageWidth - margin * 2;
    const lineHeight = 10;
    const pageHeight = doc.internal.pageSize.getHeight();
    let y = 10;

    const lines = doc.splitTextToSize(plainText, maxWidth);
    lines.forEach((line) => {
      if (y + lineHeight > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += lineHeight;
    });

    doc.save("plano_de_sono.pdf");
  };

  return (
    <GlobalStyle>
      <Header />
      <StarBackground>
        <Canvas>
          <Stars
            radius={1}
            depth={50}
            count={5000}
            factor={5}
            fade
            speed={2.5}
          />
        </Canvas>
      </StarBackground>
      <DashboardContainer>
        <h1>Seu plano está pronto! 🚀</h1>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <PlanCard>
              <h2>Plano de Sono Personalizado</h2>
              <PlanText dangerouslySetInnerHTML={{ __html: response }} />
            </PlanCard>
            <ChartContainer>
              <Bar data={barChartData} options={barChartOptions} />
            </ChartContainer>
            <PieChartContainer>
              <Pie data={pieChartData} options={pieChartOptions} />
            </PieChartContainer>
            <ButtonContainer>
              <Button onClick={() => navigate("/form")}>Voltar ao Formulário</Button>
              <Button onClick={handleDownloadPDF}>Baixar PDF</Button>
            </ButtonContainer>
          </>
        )}
      </DashboardContainer>
      <Footer />
    </GlobalStyle>
  );
};

export default ResponsePage;