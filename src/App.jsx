import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Form from "./Pages/Formulario";
import ResponsePage from "./Components/ResponsePage";


const App = () => {
  const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent); //>> Bloqueia o acesso em computadores!

  if (!isMobile) {
    return (
      <div style={{ textAlign: "center", marginTop: "20%" }}>
        <h2>O acesso é permitido apenas via <strong>celular</strong> 📱</h2>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/form" element={<Form />} />
        <Route path="/response" element={<ResponsePage />} />
      </Routes>
    </Router>
  );
};

export default App;
