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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto; // Altura automática para se ajustar ao conteúdo
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1); // Sombra para dar um efeito de elevação
  z-index: 1000; // Garantir que o footer fique acima de outros elementos


  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem 2rem;
  }
`;

const FooterText = styled.p`
  margin: 0.5rem 0;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};

  @media (min-width: 768px) {
    margin: 0;
    font-size: 1rem;
  }
`;

const FooterLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const Footer = () => (
  <>
    <GlobalStyle />
    <FooterContainer>
      <FooterText>
        Criado por{" "}
        <FooterLink
          href="https://github.com/MahFelix"
          target="_blank"
          rel="noopener noreferrer"
        >
          Agnaldo Felix
        </FooterLink>
      </FooterText>
      <FooterText>Sonus © 2025. Todos os direitos reservados.</FooterText>
    </FooterContainer>
  </>
);

export default Footer;