import express from "express";
import { tarefaRoutes } from "./routes/tarefa.route";

const app = express();
const PORTA = 3000;

app.use(express.json());
app.use(tarefaRoutes);

app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
})