import { motion } from "framer-motion";
import styled from "styled-components";
import SonusImage from "../assets/Sonusimage.png"; // Importe a imagem

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AnimatedIcon = () => (
  <motion.div
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
  >
    🌙
  </motion.div>
);

const Logo = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const LogoImage = styled.img`
  height: 40px; // Ajuste a altura conforme necessário
  width: auto; // Mantém a proporção da imagem
`;

const Header = () => (
  <HeaderContainer>
    <AnimatedIcon />
    <Logo whileHover={{ scale: 1.1 }}>
      <LogoImage src={SonusImage} alt="Sonus Logo" />
    </Logo>
    <motion.div whileHover={{ rotate: 360 }}>🌙</motion.div>
  </HeaderContainer>
);

export default Header;