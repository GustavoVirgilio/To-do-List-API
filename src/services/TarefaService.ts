interface Tarefa {
  id: string;
  title: string;
  completed: boolean;
}
interface CriarTarefa {
  title: string;
}

interface AtualizarTarefa {
  title?: string;
  completed?: boolean;
}

let tarefas: Tarefa[] = [];

class TarefaService {
  create({ title }: CriarTarefa) {
    if (!title) {
      throw new Error("Título da tarefa é obrigatório");
    }

    const novaTarefa = {
      id: String(Math.random()),
      title,
      completed: false,
    };

    tarefas.push(novaTarefa);

    return novaTarefa;
  }

  list() {
    return tarefas;
  }

  getById(idRecebido: string) {
    return tarefas.find((tarefa) => tarefa.id === idRecebido);
  }

  update(idRecebido: string, dados: AtualizarTarefa) {
    const tarefaEncontrada = tarefas.find((tarefa) => tarefa.id === idRecebido);

    if (!tarefaEncontrada) {
      return undefined;
    }

    if (dados.title) {
      tarefaEncontrada.title = dados.title;
    }

    if (dados.completed !== undefined) {
      tarefaEncontrada.completed = dados.completed;
    }

    return tarefaEncontrada;
  }

  delete(idRecebido: string) {
    const tarefaEncontrada = tarefas.find((tarefa) => tarefa.id === idRecebido);

    if (!tarefaEncontrada) {
      return false;
    }

    tarefas = tarefas.filter((tarefa) => tarefa.id !== idRecebido);

    return true;
  }
}

export { TarefaService };
