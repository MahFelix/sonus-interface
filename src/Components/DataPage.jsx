import { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background: #fff;
`;

const Input = styled.input`
    margin-bottom: 15px;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
`;

const Button = styled.button`
    padding: 10px;
    font-size: 1rem;
    color: white;
    background-color: #4caf50;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #45a049;
    }
`;

// eslint-disable-next-line react/prop-types
const DataPage = ({ onSubmit }) => {
    const [formData, setFormData] = useState({ name: '', age: '', workHours: '', sleepHours: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        onSubmit(formData);
    };

    return (
        <FormContainer>
            <h2>Preencha seus dados</h2>
            <Input type="text" name="name" placeholder="Seu nome" onChange={handleChange} />
            <Input type="number" name="age" placeholder="Sua idade" onChange={handleChange} />
            <Input type="number" name="workHours" placeholder="Carga horária de trabalho" onChange={handleChange} />
            <Input type="number" name="sleepHours" placeholder="Horas de sono desejadas" onChange={handleChange} />
            <Button onClick={handleSubmit}>Gerar Relatório</Button>
        </FormContainer>
    );
};

export default DataPage;
