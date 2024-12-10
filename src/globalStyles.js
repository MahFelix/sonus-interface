import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        font-size: 16px; /* Define o tamanho base da fonte */
    }

    body {
        font-family: 'Poppins', sans-serif;
        background-color: #f5f5f5; /* Opcional: cor de fundo global */
        color: #333; /* Opcional: cor do texto global */
        line-height: 1.6;
    }

    button, input, textarea {
        font-family: 'Poppins', sans-serif;
    }
`;

export default GlobalStyles;
