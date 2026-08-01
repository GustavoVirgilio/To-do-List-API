import { Request, Response } from "express";
import { TarefaService } from "../services/TarefaService";

const tarefaService = new TarefaService();

class TarefaController {
  async list(req: Request, res: Response) {
    const completedQuery = req.query.completed;

    if (completedQuery === undefined) {
        const tarefas = await tarefaService.list();
        return res.status(200).json(tarefas);
    }

    const completedFiltro = completedQuery === "true";
    const tarefaFiltradas = await tarefaService.list(completedFiltro);
    return res.status(200).json(tarefaFiltradas);
  }

  async getById(req: Request, res: Response) {
    const idRecebido = Number(req.params.id);

    if (Number.isNaN(idRecebido)) {
      return res.status(400).json({ mensagem: "Id inválido" });
    }

    const tarefaBuscada = await tarefaService.getById(idRecebido);

    if (tarefaBuscada === null) {
      return res
        .status(404)
        .json({ mensagem: "Tarefa com esse id não encontrada" });
    } else {
      return res.status(200).json(tarefaBuscada);
    }
  }

  async create(req: Request, res: Response) {
    const tarefaCriada = req.body;

    try {
      const novaTarefa = await tarefaService.create(tarefaCriada);
      return res.status(201).json(novaTarefa);
    } catch (error) {
      return res.status(400).json({ mensagem: (error as Error).message });
    }
  }

  async update(req: Request, res: Response) {
    const dadosRecebidos = req.body;
    const idRecebido = Number(req.params.id);

    if (Number.isNaN(idRecebido)) {
      return res.status(400).json({ mensagem: "Id inválido" });
    }

    const tarefaAtualizada = await tarefaService.update(idRecebido, dadosRecebidos);

    if (tarefaAtualizada === undefined) {
      return res.status(404).json({ mensagem: "Erro para atualizar a tarefa" });
    } else {
      return res.status(200).json(tarefaAtualizada);
    }
  }

  async delete(req: Request, res: Response) {
    const idRecebido = Number(req.params.id);

    if(Number.isNaN(idRecebido)){
      return res.status(400).json({ mensagem: "Id inválido" });
    }

    const deleteFeito = await tarefaService.delete(idRecebido);

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