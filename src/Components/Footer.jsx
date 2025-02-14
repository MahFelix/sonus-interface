import styled from "styled-components";

const GlobalStyle = styled.div`
font-family: "Quicksand", sans-serif;
`;

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 1rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px; // Altura do footer
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1); // Sombra para dar um efeito de elevação
`;

const Footer = () => (
    <>
    <GlobalStyle/>
  <FooterContainer>
    <p>Sonus © 2023. Todos os direitos reservados.</p>
  </FooterContainer>
  </>
);

export default Footer;