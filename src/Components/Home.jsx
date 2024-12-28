import LOGO from '../assets/Sonusimage.png'
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom, #6dd5ed, #2193b0);
  color: #fff;

  img {
    width: 200px;
  }
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
const Home = ({ onStart }) => {
  return (
    <Container>
      <img src={LOGO}></img>
      <h1>Bem-vindo ao Sonus</h1>
      <p>Transforme seu sono, transforme sua vida</p>
      <Button onClick={onStart}>Começar</Button>
    </Container>
  );
};

export default Home;
