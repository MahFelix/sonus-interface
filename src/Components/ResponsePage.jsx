import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";

// Estilos globais para a fonte Poppins
const GlobalStyle = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
`;

const ResponseContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: white;
`;

const ResponseText = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.text};
  text-align: left;
  white-space: pre-wrap;
  line-height: 1.6;
  font-size: 1rem;
  margin-bottom: 100px;
`;

const BackButton = styled.button`
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.3s ease;
  margin-bottom: 2rem;
  margin-left: 100px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
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

const ResponsePage = () => {
  const location = useLocation();
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state && location.state.response) {
      const responseData = location.state.response;

      let generatedText = "";
      if (typeof responseData === "string") {
        generatedText = responseData;
      } else if (responseData.candidates && responseData.candidates[0]?.content?.parts[0]?.text) {
        generatedText = responseData.candidates[0].content.parts[0].text;
      } else {
        generatedText = "Resposta inválida recebida da API.";
      }

      const formattedResponse = generatedText
        .replace(/\n/g, "<br>")
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

      setResponse(formattedResponse);
      setLoading(false);
    } else {
      setResponse("Nenhuma resposta encontrada.");
      setLoading(false);
    }
  }, [location.state]);

  return (
    <GlobalStyle>
      <Sidebar />
      <BackButton onClick={() => window.history.back()}>
              Voltar ao Formulário
            </BackButton>
      <ResponseContainer>
        <h1>Resposta Personalizada</h1>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <ResponseText dangerouslySetInnerHTML={{ __html: response }} />
            
          </>
        )}
      </ResponseContainer>
      <Footer />
    </GlobalStyle>
  );
};

export default ResponsePage;