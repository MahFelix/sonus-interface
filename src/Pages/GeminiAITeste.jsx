import { useState } from "react";
import axios from "axios";

const GeminiAITest = () => {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGeneratePrompt = async () => {
    setLoading(true);
    try {
      const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
      const apiKey = "AIzaSyDEP0ECT9U7Z2MBzaGIM3VH4n35cH_Iiww"; // Substitua pela sua chave de API

      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: "Gere um plano de sono personalizado com base nos seguintes dados: Hora de dormir: 22:30, Hora de acordar: 06:30, Dificuldades: Insônia, Qualidade do sono: 5, Nível de estresse: 7, Usa medicamentos: false, Observações: Tenho dificuldade para pegar no sono."
              }
            ]
          }
        ]
      };

      const response = await axios.post(
        `${apiUrl}?key=${apiKey}`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Extrai o texto gerado da resposta
      const generatedText = response.data.candidates[0].content.parts[0].text;
      setResponse(generatedText);
    } catch (error) {
      console.error("Erro ao gerar o prompt:", error);
      setResponse("Erro ao gerar o prompt.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Teste de Integração com Gemini AI</h1>
      <button onClick={handleGeneratePrompt} disabled={loading}>
        {loading ? "Gerando..." : "Gerar Prompt"}
      </button>
      {response && (
        <div>
          <h2>Resposta:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default GeminiAITest;