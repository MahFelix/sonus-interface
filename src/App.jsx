import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Form from "./Pages/Formulario";
import ResponsePage from "./Components/ResponsePage";

const App = () => (
  <Router>
    <Routes>
    <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/form" element={<Form />} />
      <Route path="/response" element={<ResponsePage/>} />
    </Routes>
  </Router>
);

export default App;