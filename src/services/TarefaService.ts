import { prisma } from "../config/prismaClient";

interface CriarTarefa {
  title: string;
}

interface AtualizarTarefa {
  title?: string;
  completed?: boolean;
}

class TarefaService {
  async create({ title }: CriarTarefa) {
    if (!title) {
      throw new Error("Título da tarefa é obrigatório");
    }

    const novaTarefa = await prisma.task.create({
      data: { title },
    });

    return novaTarefa;
  }

  async list(completedFiltro?: boolean) {
    if (completedFiltro === undefined) {
        return prisma.task.findMany();
    }

    return prisma.task.findMany({
      where: { completed: completedFiltro },
    });
  }

  async getById(idRecebido: number) {
    return prisma.task.findUnique({
      where: { id: idRecebido },
    });
  }

  async update(idRecebido: number, dados: AtualizarTarefa) {
    const tarefaEncontrada = await prisma.task.findUnique( {
      where: { id: idRecebido },
    });

    if (!tarefaEncontrada) {
      return undefined;
    }

    return prisma.task.update({
      where: { id: idRecebido },
      data:dados,
    });
  }

  async delete(idRecebido: number) {
    const tarefaEncontrada = await prisma.task.findUnique({
      where: { id: idRecebido },
    });

    if (!tarefaEncontrada) {
      return false;
    }

    await prisma.task.delete({
      where: { id: idRecebido },
    });

    return true;
  }
}

export { TarefaService };
