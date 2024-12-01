const express = require("express");
const {
  createVaga,
  getAllVagas,
  getVagaById, // Adicionei a função para obter uma vaga pelo ID
  updateVaga,
  deleteVaga,
} = require("./repositories/vagaRepository");

const app = express();
const port = 3000;

app.use(express.json());

// Rota POST para criar uma nova vaga
app.post("/vagas", (req, res) => {
  const { titulo, descricao, dataCadastro, telefone, status, empresa } = req.body;
  const vaga = createVaga({ titulo, descricao, dataCadastro, telefone, status, empresa });
  res.status(201).json(vaga);
});

// Rota GET para listar todas as vagas
app.get("/vagas", (req, res) => {
  const vagas = getAllVagas();
  res.status(200).json(vagas);
});

// Rota GET para obter uma vaga pelo ID
app.get("/vagas/:id", (req, res) => {
  const { id } = req.params;
  const vaga = getVagaById(id);
  
  if (vaga) {
    res.status(200).json(vaga);
  } else {
    res.status(404).send({ message: "Vaga não encontrada" });
  }
});

// Rota PUT para atualizar uma vaga
app.put("/vagas/:id", (req, res) => {
  const { id } = req.params;
  const dadosAtualizados = req.body;
  
  const vagaAtualizada = updateVaga(id, dadosAtualizados);
  
  if (vagaAtualizada) {
    res.status(200).json(vagaAtualizada);
  } else {
    res.status(404).send({ message: "Vaga não encontrada" });
  }
});

// Rota DELETE para remover uma vaga
app.delete("/vagas/:id", (req, res) => {
  const { id } = req.params;
  const removed = deleteVaga(id);
  
  if (removed) {
    res.status(204).send();
  } else {
    res.status(404).send({ message: "Vaga não encontrada" });
  }
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
