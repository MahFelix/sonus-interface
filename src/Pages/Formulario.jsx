import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../Components/Footer";
import Sonus from '../assets/Sonusimage.png';
import DOMPurify from "dompurify";
import Header from "../Components/Header";

// Função para formatar o texto do plano
const formatPlanText = (text) => {
  let formattedText = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  formattedText = formattedText.replace(/\* (.*?)\n/g, "<li>$1</li>");
  formattedText = formattedText.replace(/\n/g, "<br>");
  return DOMPurify.sanitize(formattedText);
};

// Estilos globais para a fonte Poppins
const GlobalStyle = styled.div`
font-family: "Quicksand", sans-serif;
`;

const FormContainer = styled.div`
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
  background: linear-gradient(180deg, #87ceeb, #e0f7fa); // Gradiente de céu
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 100px;


`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
  z-index: 2;
  margin-right: 12px;
  margin-left: -10px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: black;
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

const Select = styled.select`
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

const DeleteButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
  

  &:hover {
    background-color: #cc0000;
  }
`;


const Logo = styled.img`
  height: 200px;
  width: 200px;
  display: flex;
  justify-content: center;
  margin-top: -40px;
  align-items: center;
  margin-left: 65px;
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
  color: white;
  max-height: 400px;
  overflow-y: auto;
  border: solid 3px white;
  scroll-behavior: smooth;
 

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

  ul {
    list-style-type: disc;
    padding-left: 20px;
    margin: 0.5rem 0;
  }

  strong {
    font-weight: bold;
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

const Form = () => {
  const [formData, setFormData] = useState({
    bedtime: "",
    wakeupTime: "",
    difficulties: [""],
    sleepQuality: 5,
    stressLevel: 5,
    usesMedication: false,
    medicationDetails: "",
    sleepNotes: "",
    plan: "",
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
        const response = await axios.get("https://sonointeligente.onrender.com/api/sleep/save/history");
        console.log("Dados retornados pelo backend:", response.data);
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
      const response = await axios.post(
        "https://sonointeligente.onrender.com/api/sleep/generate-prompt",
        formData
      );
      navigate("/response", { state: { response: response.data } });
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`https://sonointeligente.onrender.com/api/sleep/${id}`);
      setSleepHistory(sleepHistory.filter((entry) => entry.id !== id));
    } catch (error) {
      console.error("Erro ao deletar o plano de sono:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleReport = () => {
    setShowReport(!showReport);
  };

  return (
    <GlobalStyle>
      <Header/>
      <FormContainer>
   
      <form onSubmit={handleSubmit}>
  <InputGroup>
    <Logo src={Sonus} alt="Sonus Logo" />
    <Label htmlFor="bedtime">A que horas você pretende dormir hoje? 😴</Label>
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
    <Label htmlFor="wakeupTime">E a que horas quer acordar? ⏰</Label>
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
    <Label htmlFor="difficulties">
      Tem enfrentado alguma dificuldade para dormir? Me conta! 🤔
    </Label>
    <Input
      id="difficulties"
      type="text"
      placeholder="Ex: Insônia, sonolência diurna, etc."
      value={formData.difficulties.join(", ")}
      onChange={(e) =>
        setFormData({
          ...formData,
          difficulties: e.target.value.split(",").map(item => item.trim())
        })
      }
    />
  </InputGroup>

  <InputGroup>
    <Label htmlFor="usesMedication">
      Você usa algum medicamento para dormir? 💊
    </Label>
    <Select
      id="usesMedication"
      value={formData.usesMedication}
      onChange={(e) =>
        setFormData({ ...formData, usesMedication: e.target.value === "true" })
      }
    >
      <option value="true">Sim</option>
      <option value="false">Não</option>
    </Select>
  </InputGroup>

  {formData.usesMedication && (
    <InputGroup>
      <Label htmlFor="medicationDetails">
        Ah, e quais são os medicamentos? Me diz os detalhes! 📝
      </Label>
      <Input
        id="medicationDetails"
        type="text"
        placeholder="Ex: Nome do medicamento, dosagem, etc."
        value={formData.medicationDetails}
        onChange={(e) =>
          setFormData({ ...formData, medicationDetails: e.target.value })
        }
      />
    </InputGroup>
  )}

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
                    <strong>Data:</strong> {new Date(entry.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Plano:</strong>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: formatPlanText(entry.plan || "Nenhum plano disponível"),
                      }}
                    />
                  </p>
                  <DeleteButton onClick={() => handleDelete(entry.id)}>
                    Deletar
                  </DeleteButton>
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