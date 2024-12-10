/* eslint-disable react/prop-types */

import styled from 'styled-components';

const ReportContainer = styled.div`
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    color: #4caf50;
`;

const ReportItem = styled.p`
    font-size: 1rem;
    margin-bottom: 10px;
`;

const ReportPage = ({ report }) => (
    <ReportContainer>
        <Title>Relatório de Sono</Title>
        <ReportItem><strong>Nome:</strong> {report.name}</ReportItem>
        <ReportItem><strong>Idade:</strong> {report.age}</ReportItem>
        <ReportItem><strong>Carga Horária de Trabalho:</strong> {report.workHours} horas</ReportItem>
        <ReportItem><strong>Horas de Sono Desejadas:</strong> {report.sleepHours} horas</ReportItem>
        <ReportItem><strong>Recomendações:</strong></ReportItem>
        <ul>
            {report.recommendations.map((rec, idx) => (
                <li key={idx}>{rec}</li>
            ))}
        </ul>
    </ReportContainer>
);

export default ReportPage;
