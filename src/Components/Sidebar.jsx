import { motion } from "framer-motion";
import styled from "styled-components";


const SideContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
`;

const AnimatedIcon = () => (
    <motion.div
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
    >
      🌙
    </motion.div>
  );

const Header = () => (
  <SideContainer>
     <AnimatedIcon/>
    <Logo whileHover={{ scale: 1.1 }}>Sonus</Logo>
    <motion.div whileHover={{ rotate: 360 }}>🌙</motion.div>
  </SideContainer>
);

export default Header;