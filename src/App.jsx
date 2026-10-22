
import { useState } from "react";
import "./App.css";

function App() {
  // Estados da aplicação
  const [texto, setTexto] = useState("");
  const [tarefas, setTarefas] = useState([]);
  const [filtro, setFiltro] = useState("todas");

  // Etapa 1: adicionar tarefas
  function adicionarTarefa(evento) {
    evento.preventDefault();

    const textoLimpo = texto.trim();

    if (textoLimpo === "") {
      return;
    }

    const novaTarefa = {
      id: Date.now(),
      texto: textoLimpo,
      concluida: false,
    };

    setTarefas((anteriores) => [...anteriores, novaTarefa]);
    setTexto("");
  }

  // Etapa 3: marcar ou desmarcar uma tarefa
  function alternarConclusao(id) {
    setTarefas((anteriores) =>
      anteriores.map((tarefa) => {
        if (tarefa.id === id) {
          return {
            ...tarefa,
            concluida: !tarefa.concluida,
          };
        }

        return tarefa;
      })
    );
  }

  // Etapa 4: remover uma tarefa
  function removerTarefa(id) {
    setTarefas((anteriores) =>
      anteriores.filter((tarefa) => tarefa.id !== id)
    );
  }

  // Desafio extra: limpar tarefas concluídas
  function limparConcluidas() {
    setTarefas((anteriores) =>
      anteriores.filter((tarefa) => !tarefa.concluida)
    );
  }

  // Etapa 5: calcular o resumo
  const total = tarefas.length;

  const concluidas = tarefas.filter(
    (tarefa) => tarefa.concluida
  ).length;

  const pendentes = total - concluidas;

  // Etapa 5: filtrar as tarefas
  const tarefasVisiveis = tarefas.filter((tarefa) => {
    if (filtro === "pendentes") {
      return !tarefa.concluida;
    }

    if (filtro === "concluidas") {
      return tarefa.concluida;
    }

    return true;
  });

  return (
    <main className="container">
      <h1>Organizador de tarefas</h1>

      <p className="subtitulo">
        Cadastre, organize e acompanhe suas tarefas.
      </p>

      {/* Formulário para adicionar tarefas */}
      <form onSubmit={adicionarTarefa}>
        <label htmlFor="nova-tarefa">Nova tarefa</label>

        <div className="campo-tarefa">
          <input
            id="nova-tarefa"
            type="text"
            value={texto}
            onChange={(evento) => setTexto(evento.target.value)}
            placeholder="Digite uma tarefa..."
          />

          <button type="submit">Adicionar</button>
        </div>
      </form>

      {/* Resumo das tarefas */}
      <section className="resumo">
        <p>
          Total: <strong>{total}</strong>
        </p>

        <p>
          Concluídas: <strong>{concluidas}</strong>
        </p>

        <p>
          Pendentes: <strong>{pendentes}</strong>
        </p>
      </section>

      {/* Filtros */}
      <section className="filtros">
        <button
          type="button"
          className={filtro === "todas" ? "ativo" : ""}
          onClick={() => setFiltro("todas")}
        >
          Todas
        </button>

        <button
          type="button"
          className={filtro === "pendentes" ? "ativo" : ""}
          onClick={() => setFiltro("pendentes")}
        >
          Pendentes
        </button>

        <button
          type="button"
          className={filtro === "concluidas" ? "ativo" : ""}
          onClick={() => setFiltro("concluidas")}
        >
          Concluídas
        </button>
      </section>

      {/* Lista de tarefas */}
      <ul className="lista-tarefas">
        {tarefasVisiveis.length === 0 && (
          <li className="vazio">
            Nenhuma tarefa para exibir.
          </li>
        )}

        {tarefasVisiveis.map((tarefa) => (
          <li key={tarefa.id} className="item-tarefa">
            <label className="texto-tarefa">
              <input
                type="checkbox"
                checked={tarefa.concluida}
                onChange={() => alternarConclusao(tarefa.id)}
              />

              <span
                className={tarefa.concluida ? "concluida" : ""}
              >
                {tarefa.texto}
              </span>
            </label>

            <button
              type="button"
              className="botao-remover"
              onClick={() => removerTarefa(tarefa.id)}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>

      {/* Desafio extra */}
      <button
        type="button"
        className="botao-limpar"
        onClick={limparConcluidas}
        disabled={concluidas === 0}
      >
        Limpar concluídas
      </button>
    </main>
  );
}

export default App;

