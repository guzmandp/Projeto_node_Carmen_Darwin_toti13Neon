const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const Task = require("./models/task");

const port = 6000;

const app = express();
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "task.db",
});
const tasks = Task(sequelize, DataTypes);

// We need to parse JSON coming from requests
app.use(express.json());

// List tasks
app.get("/tarefas", async (req, res) => {
  try {
    const task = await tasks.findAll({});
    res.status(200).json({ task });
  } catch (error) {
    res.status(400).json({ msj: "Erro da Busca!" });
    console.log("Erro da Busca!");
  }
});

// Create task
app.post("/tarefa/nova", async (req, res) => {
  try {
    console.log(req.body);
    const { description, done } = req.body;
    const task = new tasks({ description, done });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(404).json({ msj: "Erro de Cadastro!" });
    console.log("Erro de Cadastro!");
  }
});

// Show task
app.get("/tarefa/:id", async (req, res) => {
  try {
    const task = await tasks.findByPk(req.params.id);
    if (task) {
      res.status(200).json({ task });
    } else {
      res.status(404).json("Dados Não encontrados!");
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ msj: "Dados Não encontrados!" });
  }
});

// Update task
app.put("/tarefa/:id", async (req, res) => {
  try {
    const task = await tasks.findByPk(req.params.id);
    if ((task && req.body.description) || req.body.done) {
      await task.update(req.body);
      res.status(201).json(task);
    } else {
      res.status(404).json("Erro dados não encontrado!");
    }
  } catch (error) {
    res.status(404).json({ msj: "Erro dados não encontrado!" });
    console.log("Erro dados não encontrado!");
  }
});

// Delete task
app.delete("/tarefa/:id", async (req, res) => {
  try {
    const task = await tasks.findByPk(req.params.id);
    if (task) {
      await task.destroy();
      res.status(200).json("Tarefa deletada com Sucesso!");
    } else {
      res.status(404).json("Dados não encontrados");
    }
  } catch (error) {
    res.status(404).json({ msj: "Erro dados não encontrado!" });
    console.log("Erro dados não encontrado!");
  }
});

app.listen(port, () => {
  console.log(`Iniciando na porta http://localhost:${port}`);
});
