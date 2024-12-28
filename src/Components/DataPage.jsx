import { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 450px;
  margin: 40px auto;
  padding: 30px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const InputWrapper = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s;
  
  &:focus {
    border-color: #4caf50;
  }
`;

const Button = styled.button`
  padding: 12px;
  font-size: 1.1rem;
  color: white;
  background-color: #4caf50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #45a049;
  }
  
  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.875rem;
  margin-top: 10px;
`;

// eslint-disable-next-line react/prop-types
const DataPage = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ name: '', age: '', workHours: '', sleepHours: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.age || !formData.workHours || !formData.sleepHours) {
      setError('Todos os campos são obrigatórios.');
      return;
    }
    setError('');
    onSubmit(formData);
  };

  return (
    <FormContainer>
      <Title>Preencha seus dados</Title>
      
      <InputWrapper>
        <Label htmlFor="name">Seu nome</Label>
        <Input 
          type="text" 
          id="name" 
          name="name" 
          placeholder="Seu nome" 
          value={formData.name} 
          onChange={handleChange} 
        />
      </InputWrapper>
      
      <InputWrapper>
        <Label htmlFor="age">Sua idade</Label>
        <Input 
          type="number" 
          id="age" 
          name="age" 
          placeholder="Sua idade" 
          value={formData.age} 
          onChange={handleChange} 
        />
      </InputWrapper>

      <InputWrapper>
        <Label htmlFor="workHours">Carga horária de trabalho</Label>
        <Input 
          type="number" 
          id="workHours" 
          name="workHours" 
          placeholder="Carga horária de trabalho" 
          value={formData.workHours} 
          onChange={handleChange} 
        />
      </InputWrapper>

      <InputWrapper>
        <Label htmlFor="sleepHours">Horas de sono desejadas</Label>
        <Input 
          type="number" 
          id="sleepHours" 
          name="sleepHours" 
          placeholder="Horas de sono desejadas" 
          value={formData.sleepHours} 
          onChange={handleChange} 
        />
      </InputWrapper>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Button onClick={handleSubmit} disabled={!formData.name || !formData.age || !formData.workHours || !formData.sleepHours}>
        Gerar Relatório
      </Button>
    </FormContainer>
  );
};

export default DataPage;
