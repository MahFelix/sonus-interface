import styled from 'styled-components';
import logoSonus from '../assets/Sonusimage.png';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(to bottom, #6dd5ed, #2193b0);
    color: #fff;
`;

const Image = styled.img`
    width: 150px; /* Ajuste o tamanho da imagem conforme necessário */
    height: auto;
    margin-bottom: 20px;
`;

const Logo = styled.h1`
    font-size: 3rem;
    font-weight: bold;
    margin: 0;
`;

const Subtitle = styled.p`
    font-size: 1.2rem;
    margin-top: 10px;
`;

const Button = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 1rem;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
`;

// eslint-disable-next-line react/prop-types
const Home = ({ onStart }) => (
    <Container>
        <Image src={logoSonus} alt="Logo Sonus" />
        <Logo>SONUS</Logo>
        <Subtitle>Transforme seu sono, transforme sua vida</Subtitle>
        <Button onClick={onStart}>Começar</Button>
    </Container>
);

export default Home;
