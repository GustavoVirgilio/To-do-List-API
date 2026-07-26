import { Request, Response } from "express";
import { TarefaService } from "../services/TarefaService";

const tarefaService = new TarefaService();

class TarefaController {
  list(req: Request, res: Response) {
    const tarefas = tarefaService.list();
    return res.status(200).json(tarefas);
  }

  getById(req: Request, res: Response) {
    const idRecebido = req.params.id;

    if (typeof idRecebido !== "string") {
      return res.status(400).json({ mensagem: "Id inválido " });
    }

    const tarefaBuscada = tarefaService.getById(idRecebido);

    if (tarefaBuscada === undefined) {
      return res
        .status(404)
        .json({ mensagem: "Tarefa com esse id não encontrada" });
    } else {
      return res.status(200).json(tarefaBuscada);
    }
  }

  create(req: Request, res: Response) {
    const tarefaCriada = req.body;

    try {
      const novaTarefa = tarefaService.create(tarefaCriada);
      return res.status(201).json(novaTarefa);
    } catch (error) {
      return res.status(400).json({ mensagem: (error as Error).message });
    }
  }

  update(req: Request, res: Response) {
    const dadosRecebidos = req.body;
    const idRecebido = req.params.id;

    if (typeof idRecebido !== "string") {
      return res.status(400).json({ mensagem: "Id inválido " });
    }

    const tarefaAtualizada = tarefaService.update(idRecebido, dadosRecebidos);

    if (tarefaAtualizada === undefined) {
      return res.status(404).json({ mensagem: "Erro para atualizar a tarefa" });
    } else {
      return res.status(200).json(tarefaAtualizada);
    }
  }

  delete(req: Request, res: Response) {
    const idRecebido = req.params.id;

    if (typeof idRecebido !== "string") {
      return res.status(400).json({ mensagem: "Id inválido" });
    }

    const deleteFeito = tarefaService.delete(idRecebido);

    if (deleteFeito === false) {
      return res
        .status(404)
        .json({ mensagem: "Tarefa não encontrada para deletar" });
    } else {
      return res.status(204).send();
    }
  }
}

export { TarefaController };
