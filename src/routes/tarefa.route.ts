import { Router } from "express";
import { TarefaController } from "../controllers/TarefaController";

const router = Router();
const tarefaController = new TarefaController();

router.post("/tasks", tarefaController.create);
router.get("/tasks", tarefaController.list);
router.get("/tasks/:id", tarefaController.getById);
router.put("/tasks/:id", tarefaController.update);
router.delete("/tasks/:id", tarefaController.delete);

export { router as tarefaRoutes };