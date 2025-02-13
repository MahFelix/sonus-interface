import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { theme } from "./styles/theme";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( // Corrigido para 'render' ao invés de 'rende'
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
