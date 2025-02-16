/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer from "../Components/Footer";
import axios from "axios";
import DOMPurify from "dompurify"; // Importe DOMPurify para sanitizar o conteúdo
import { jsPDF } from "jspdf"; // Importe a biblioteca jspdf
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import Header from "./Header";

// Estilos globais para a fonte Poppins
const GlobalStyle = styled.div`
  font-family: "Quicksand", sans-serif;
  position: relative;
  min-height: 100vh;
  background-color: #0a0a23; /* Fundo escuro para o tema espacial */
`;

const ResponseContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.8); /* Fundo semi-transparente */
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: white;
  padding-bottom: 100px;
  position: relative;
  z-index: 1; /* Garante que o conteúdo fique acima do fundo estrelado */
`;

const ResponseText = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.text};
  text-align: left;
  border: solid 3px white;
  white-space: pre-wrap;
  line-height: 1.6;
  font-size: 1rem;
  margin-bottom: 10px;
  max-height: 400px; // Altura máxima da div
  overflow-y: auto; // Habilita a rolagem vertical
  scroll-behavior: smooth; // Rolagem suave

  /* Estilizando a barra de rolagem */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px; // Espaçamento entre os botões
  margin-top: 2rem;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1; /* Garante que os botões fiquem acima do fundo estrelado */

`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid ${({ theme }) => theme.colors.primary};
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

// Estilos para o fundo estrelado
const StarBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0; /* Garante que o fundo fique atrás de todo o conteúdo */
  pointer-events: none; /* Impede que o fundo interfira com cliques */
`;

const Message = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
`;

const ResponsePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(""); // Estado para feedback ao salvar o plano

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

  // // Função para salvar o plano de sono
  // const handleSavePlan = async () => {
  //   try {
  //     // Verifica se os dados do formulário estão disponíveis
  //     if (!location.state || !location.state.formData) {
  //       throw new Error("Dados do formulário não encontrados.");
  //     }

  //     const responseData = location.state.response;
  //     const generatedText =
  //       typeof responseData === "string"
  //         ? responseData
  //         : responseData.candidates[0].content.parts[0].text;

  //     // Recupera os dados do formulário do estado da localização
  //     const formData = location.state.formData;

  //     // Cria o objeto SleepPlan com todos os campos necessários
  //     const sleepPlan = {
  //       bedtime: formData.bedtime,
  //       wakeupTime: formData.wakeupTime,
  //       difficulties: formData.difficulties.join(", "), // Converte array para string
  //       sleepQuality: formData.sleepQuality,
  //       stressLevel: formData.stressLevel,
  //       usesMedication: formData.usesMedication,
  //       medicationDetails: formData.medicationDetails,
  //       sleepNotes: formData.sleepNotes,
  //       plan: generatedText, // Plano gerado pela API
  //       createdAt: new Date().toISOString(), // Data de criação
  //     };

  //     // Envia o plano de sono para o backend
  //     await axios.post("http://localhost:8090/api/sleep/save", sleepPlan);

  //     setMessage("Plano de sono salvo com sucesso!");
  //     navigate("/form"); // Redireciona para o formulário
  //   } catch (error) {
  //     console.error("Erro ao salvar o plano de sono:", error);
  //     setMessage("Erro ao salvar o plano de sono. Verifique o console para mais detalhes.");
  //   }
  // };

  // Função para baixar o texto em PDF
  const handleDownloadPDF = () => {
    // Remove as tags HTML e converte o conteúdo em texto simples
    const plainText = response
      .replace(/<br\s*\/?>/g, "\n") // Substitui <br> por \n
      .replace(/<[^>]+>/g, ""); // Remove outras tags HTML

    // Cria um novo documento PDF
    const doc = new jsPDF();

    // Configurações para quebrar o texto em várias linhas
    const pageWidth = doc.internal.pageSize.getWidth(); // Largura da página
    const margin = 10; // Margem esquerda e direita
    const maxWidth = pageWidth - margin * 2; // Largura máxima do texto
    const lineHeight = 10; // Altura de cada linha
    const pageHeight = doc.internal.pageSize.getHeight(); // Altura da página
    let y = 10; // Posição Y inicial

    // Divide o texto em várias linhas
    const lines = doc.splitTextToSize(plainText, maxWidth);

    // Adiciona o texto ao PDF
    lines.forEach((line) => {
      if (y + lineHeight > pageHeight - margin) {
        doc.addPage(); // Adiciona uma nova página
        y = margin; // Reinicia a posição Y
      }
      doc.text(line, margin, y); // Adiciona a linha ao PDF
      y += lineHeight; // Atualiza a posição Y
    });

    // Salva o PDF com um nome de arquivo
    doc.save("plano_de_sono.pdf");
  };

  return (
    <GlobalStyle>
      <Header/>
      <StarBackground>
        <Canvas>
          <Stars
            radius={1} // Estrelas menores
            depth={50} // Profundidade maior
            count={5000} // Menos estrelas
            factor={5} // Menos brilho
            fade
            speed={2.5} // Movimento mais lento
          />
        </Canvas>
      </StarBackground>
      <ButtonContainer>
        <Button onClick={() => navigate("/form")}>
          Voltar ao Formulário
        </Button>
        {/* <Button onClick={handleSavePlan}>Salvar Plano de Sono</Button> */}
      </ButtonContainer>
      <ResponseContainer>
        <h1>Seu plano está pronto! 🚀</h1>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <ResponseText dangerouslySetInnerHTML={{ __html: response }} />
            {message && <Message>{message}</Message>}
            <Button onClick={handleDownloadPDF}>Baixar PDF</Button>
          </>
        )}
      </ResponseContainer>
      <Footer />
    </GlobalStyle>
  );
};

export default ResponsePage;