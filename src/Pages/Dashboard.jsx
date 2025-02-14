import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa"; // Ícone de play

// Estilos globais
const GlobalStyle = styled.div`
  font-family: "Quicksand", sans-serif;
  background: linear-gradient(180deg, #87ceeb, #e0f7fa); // Gradiente de céu
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
`;

// Animação de fundo (nuvens se movendo)
const MovingClouds = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 300px;
    height: 150px;
    background: white;
    border-radius: 50%;
    opacity: 0.8;
    animation: moveClouds 20s linear infinite;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  &::before {
    top: 20%;
    left: -300px;
    animation-delay: 0s;
  }

  &::after {
    top: 50%;
    left: -300px;
    animation-delay: 10s;
  }

  @keyframes moveClouds {
    0% {
      transform: translateX(-300px);
    }
    100% {
      transform: translateX(calc(100vw + 300px));
    }
  }
`;

// Container principal
const Container = styled.div`
  text-align: center;
  position: relative;
  z-index: 2;
`;

// Estilo da nuvem
const Cloud = styled.div`
  width: 300px;
  height: 100px;
  background: white;
  border-radius: 50%;
  position: relative;
  margin: 0 auto 2rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);

  &::before,
  &::after {
    content: "";
    position: absolute;
    background: white;
    border-radius: 50%;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  &::before {
    width: 150px;
    height: 150px;
    top: -60px;
    left: 20px;
  }

  &::after {
    width: 200px;
    height: 200px;
    top: -90px;
    right: 20px;
  }
`;

// Estilo do botão
const StartButton = styled(animated.button)`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #1e90ff; // Azul
  color: white;
  border: none;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease, transform 0.3s ease;
  z-index: 3;

  &:hover {
    background-color: #0077b6; // Azul mais escuro
    transform: translate(-50%, -50%) scale(1.1);
  }
`;

// Animação ao redor do botão
const PulseCircle = styled(animated.div)`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 140px;
  height: 140px;
  border: 2px solid #1e90ff;
  border-radius: 50%;
  z-index: 2;
`;

// Estilo do CTA (Call to Action)
const CTA = styled(animated.div)`
  position: absolute;
  top: 120%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #1e90ff;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  z-index: 2;
`;

const Dashboard = () => {
  const navigate = useNavigate();

  // Animação do botão
  const buttonAnimation = useSpring({
    from: { transform: "translate(-50%, -50%) scale(0.9)" },
    to: async (next) => {
      while (true) {
        await next({ transform: "translate(-50%, -50%) scale(1.1)" });
        await next({ transform: "translate(-50%, -50%) scale(0.9)" });
      }
    },
    config: { duration: 1000 },
  });

  // Animação do círculo pulsante
  const pulseAnimation = useSpring({
    from: { opacity: 0, transform: "translate(-50%, -50%) scale(0.5)" },
    to: async (next) => {
      while (true) {
        await next({ opacity: 1, transform: "translate(-50%, -50%) scale(1.2)" });
        await next({ opacity: 0, transform: "translate(-50%, -50%) scale(0.5)" });
      }
    },
    config: { duration: 1500 },
  });

  // Animação do CTA
  const ctaAnimation = useSpring({
    from: { opacity: 0, transform: "translate(-50%, -50%) translateY(20px)" },
    to: { opacity: 1, transform: "translate(-50%, -50%) translateY(0)" },
    delay: 500,
    config: { duration: 1000 },
  });

  // Navegação para o formulário
  const handleStartClick = () => {
    navigate("/form");
  };

  return (
    <GlobalStyle>
      {/* Animação de nuvens ao fundo */}
      <MovingClouds />

      <Container>
        {/* Nuvem */}
        <Cloud />

        {/* Botão INICIAR com animação */}
        <StartButton style={buttonAnimation} onClick={handleStartClick}>
          <FaPlay size={24} /> {/* Ícone de play */}
        </StartButton>

        {/* Círculo pulsante ao redor do botão */}
        <PulseCircle style={pulseAnimation} />

        {/* CTA (Call to Action) */}
        <CTA style={ctaAnimation}>
          Regularize seu sono com o SONUS!
        </CTA>
      </Container>
    </GlobalStyle>
  );
};

export default Dashboard;