import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";
import Sonus from '../assets/Sonusimage.png'

// Estilos globais para a fonte Poppins
const GlobalStyle = styled.div`
  font-family: 'Poppins', sans-serif;
`;

const FormContainer = styled.div`
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;


const Logo = styled.img`
  height: 200px; // Ajuste a altura conforme necessário
  width: 200px; // Mantém a proporção da imagem
  display: flex;
  justify-content: center;
  margin-top: -80px;
  align-items: center;
  margin-left:65px;
`;

const ReportContainer = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 12px;
`;

const ReportTitle = styled.h3`
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.25rem;
  font-weight: 600;
`;

const ReportItem = styled.div`
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.text};
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

const Form = () => {
  const [formData, setFormData] = useState({
    bedtime: "",
    wakeupTime: "",
    difficulties: "",
    sleepQuality: 5,
    stressLevel: 5,
    usesMedication: false,
    sleepNotes: "",
  });
  const [sleepHistory, setSleepHistory] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Busca o histórico de sono ao carregar o componente
  useEffect(() => {
    const fetchSleepHistory = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8090/api/sleep/history");
        setSleepHistory(response.data);
      } catch (error) {
        console.error("Erro ao buscar histórico de sono:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSleepHistory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Envia os dados para o backend
      const response = await axios.post(
        "http://localhost:8090/api/sleep/generate-prompt",
        formData
      );
      // Navega para a página de resposta com o resultado
      navigate("/response", { state: { response: response.data } });
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleReport = () => {
    setShowReport(!showReport);
  };

  return (
    <GlobalStyle>
      <Sidebar />
      <FormContainer>
        <h2>Formulário de Sono</h2>
        <form onSubmit={handleSubmit}>
          <InputGroup>
          <Logo src={Sonus}></Logo>
            <Label htmlFor="bedtime">Hora de dormir</Label>
            <Input
              id="bedtime"
              type="time"
              value={formData.bedtime}
              onChange={(e) =>
                setFormData({ ...formData, bedtime: e.target.value })
              }
            />
          </InputGroup>

          <InputGroup>
            <Label htmlFor="wakeupTime">Hora de acordar</Label>
            <Input
              id="wakeupTime"
              type="time"
              value={formData.wakeupTime}
              onChange={(e) =>
                setFormData({ ...formData, wakeupTime: e.target.value })
              }
            />
          </InputGroup>

          <InputGroup>
            <Label htmlFor="difficulties">Dificuldades</Label>
            <Input
              id="difficulties"
              type="text"
              placeholder="Ex: Insônia, sonolência diurna, etc."
              value={formData.difficulties}
              onChange={(e) =>
                setFormData({ ...formData, difficulties: e.target.value })
              }
            />
          </InputGroup>

          <Button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Enviar"}
          </Button>
        </form>

        <Button onClick={toggleReport} disabled={loading}>
          {showReport ? "Ocultar Relatório" : "Ver Relatório de Sono"}
        </Button>

        {showReport && (
          <ReportContainer>
            <ReportTitle>Histórico de Sono</ReportTitle>
            {loading ? (
              <LoadingSpinner />
            ) : sleepHistory.length > 0 ? (
              sleepHistory.map((entry, index) => (
                <ReportItem key={index}>
                  <p>
                    <strong>Data:</strong> {new Date(entry.date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Hora de dormir:</strong> {entry.bedtime}
                  </p>
                  <p>
                    <strong>Hora de acordar:</strong> {entry.wakeupTime}
                  </p>
                  <p>
                    <strong>Dificuldades:</strong> {entry.difficulties}
                  </p>
                </ReportItem>
              ))
            ) : (
              <p>Nenhum dado de sono registrado.</p>
            )}
          </ReportContainer>
        )}
      </FormContainer>
      <Footer />
    </GlobalStyle>
  );
};

export default Form;