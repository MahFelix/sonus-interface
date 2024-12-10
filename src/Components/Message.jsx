import styled from 'styled-components';

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #f4f4f4;
`;

const Message = styled.p`
    font-size: 1.5rem;
    color: #333;
`;

const Loading = () => (
    <LoadingContainer>
        <Message>Gerando seu relatório, por favor aguarde...</Message>
    </LoadingContainer>
);

export default Loading;
