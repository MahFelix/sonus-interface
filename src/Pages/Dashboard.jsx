import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

// Estilos globais
const GlobalStyle = styled.div`
  font-family: "Quicksand", sans-serif;
  background: linear-gradient(180deg, #87ceeb, #e0f7fa);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
`;

// Animação de nuvens
const moveClouds = keyframes`
  0% { transform: translateX(-300px); }
  100% { transform: translateX(calc(100vw + 300px)); }
`;

const MovingClouds = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 2;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 300px;
    height: 150px;
    background: white;
    border-radius: 50%;
    opacity: 0.8;
    animation: ${moveClouds} 20s linear infinite;
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
`;

// Container principal
const Container = styled.div`
  text-align: center;
  position: relative;
  z-index: 2;
`;

// Componente de Nuvem
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

// Botão de Iniciar
const StartButton = styled(motion.button)`
  position: absolute;
  top: 1%;
  left: 33%;
  transform: translate(-50%, -50%);
  background-color: #1e90ff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 140px;
  height: 140px;
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
    background-color: #0077b6;
    transform: translate(-50%, -50%) scale(1.1);
  }
`;

// Animação de Círculo Pulsante
const Pulse = styled(motion.div)`
  position: absolute;
  top: -10%;
  left: 30%;
  transform: translate(-50%, -50%);
  width: 160px;
  height: 160px;
  border: 2px solid #1e90ff;
  border-radius: 50%;
  z-index: 2;
`;

// Texto de Boas-Vindas
const WelcomeText = styled(motion.h1)`
  position: absolute;
  top: -200%;
  left: -7%;
  transform: translate(-50%, -50%);
  color: #1e90ff;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  z-index: 2;
  white-space: nowrap;
`;

// Texto do CTA
const CtaText = styled(motion.h1)`
  position: absolute;
  top: 110%;
  left: 12%;
  transform: translate(-50%, -50%);
  color: #1e90ff;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  z-index: 2;
  white-space: nowrap;
`;

const Dashboard = () => {
  const navigate = useNavigate();

  // Animação do botão
  const buttonAnimation = {
    scale: [0.9, 1.1, 0.9],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: "mirror",
    },
  };

  // Animação do círculo pulsante
  const pulseAnimation = {
    scale: [0.5, 1.2],
    opacity: [0, 1, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "mirror",
    },
  };

  // Animação do texto de boas-vindas
  const welcomeAnimation = {
    opacity: [0, 1],
    y: [-20, 0],
    transition: {
      duration: 1,
      delay: 0.3,
    },
  };

  // Animação do CTA
  const ctaAnimation = {
    opacity: [0, 1],
    y: [20, 0],
    transition: {
      duration: 1,
      delay: 0.5,
    },
  };

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

        {/* Texto de Boas-Vindas */}
        <WelcomeText animate={welcomeAnimation}>
          Bem-vindo ao SONUS!
        </WelcomeText>

        {/* Botão INICIAR com animação */}
        <StartButton
          animate={buttonAnimation}
          onClick={handleStartClick}
        >
          <FaPlay size={36} />
        </StartButton>

        {/* Círculo pulsante */}
        <Pulse animate={pulseAnimation} />

        {/* Texto do CTA */}
        <CtaText animate={ctaAnimation}>
          Regularize seu sono<br/>
           com o SONUS!
        </CtaText>
      </Container>
    </GlobalStyle>
  );
};

export default Dashboard;