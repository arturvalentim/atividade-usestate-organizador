
import { useState } from "react";
import "./App.css";

function App() {
  const [texto, setTexto] = useState("");
  const [tarefas, setTarefas] = useState([]);
  const [filtro, setFiltro] = useState("todas");

  return (
    <main>
      <h1>Organizador de tarefas</h1>
      <p>Bem-vindo ao seu organizador!</p>
    </main>
  );
}

export default App;

