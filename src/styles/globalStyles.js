
import { createGlobalStyle } from "styled-components";


export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: "Quicksand, sans-serif";
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }
`;