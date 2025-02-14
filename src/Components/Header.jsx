/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

// Estilos do cabeçalho
const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;

`;

// Estilos para o fundo estrelado
const StarBackground = styled.div`
  position: absolute;
  top: 0;
  left: 20%;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

// Estilos para o contêiner de mensagens
const MessageContainer = styled(motion.div)`
  position: absolute;

left: 10%;
  transform: translate(-50%, -50%);
  font-size: 1rem;
  color: white;
  text-align: center;
  z-index: 2;


padding: 10px 10px;

  backdrop-filter: blur(2px); // Efeito de desfoque

`;

// Ícone animado
const AnimatedIcon = () => (
  <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
    🌙
  </motion.div>
);

// Lista de mensagens interativas
const messages = [
  "Oi, eu sou o SONUS! 🌝",
  "Vou te ajudar a regularizar o sono.",
  "Pronto para uma noite de sono incrível?",
  "Vamos começar?",
];

// Efeito de digitação
const TypewriterText = styled(motion.span)`
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid white; // Cursor de digitação
  animation: blink-caret 0.75s step-end infinite;

  @keyframes blink-caret {
    from,
    to {
      border-color: transparent;
    }
    50% {
      border-color: white;
    }
  }
`;

const Header = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  // Alternar entre as mensagens
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 5000); // Muda a mensagem a cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  // Efeito de digitação
  useEffect(() => {
    setIsTyping(true);
    const message = messages[currentMessage];
    let currentCharIndex = 0;

    const typeInterval = setInterval(() => {
      if (currentCharIndex < message.length) {
        setDisplayedText(message.substring(0, currentCharIndex + 1));
        currentCharIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, 100); // Velocidade da digitação

    return () => clearInterval(typeInterval);
  }, [currentMessage]);

  return (
    <HeaderContainer>
      {/* Fundo estrelado */}
      <StarBackground>
        <Canvas>
          <Stars
            radius={1} // Estrelas menores
            depth={50} // Profundidade maior
            count={200} // Menos estrelas
            factor={2} // Menos brilho
            fade
            speed={0.5} // Movimento mais lento
          />
        </Canvas>
      </StarBackground>

      {/* Ícone animado à esquerda */}
      <AnimatedIcon />

      {/* Mensagem interativa */}
      <MessageContainer
        key={currentMessage}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <TypewriterText>{displayedText}</TypewriterText>
      </MessageContainer>

      {/* Ícone animado à direita */}
      <motion.div whileHover={{ rotate: 360 }}>🌙</motion.div>
    </HeaderContainer>
  );
};

export default Header;