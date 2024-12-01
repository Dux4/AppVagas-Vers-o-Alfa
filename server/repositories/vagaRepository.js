const { v4: uuidv4 } = require("uuid");

// Array para armazenar as vagas
let vagas = [];

// Função para criar uma nova vaga
function createVaga({ titulo, descricao, dataCadastro, telefone, status, empresa }) {
  const vaga = {
    id: uuidv4(), // Gera um ID único
    titulo,
    descricao,
    dataCadastro,
    telefone,
    status,
    empresa,
  };

  vagas.push(vaga);
  return vaga;
}

// Função para obter todas as vagas
function getAllVagas() {
  return vagas;
}

// Função para obter uma vaga pelo ID
function getVagaById(id) {
  return vagas.find((vaga) => vaga.id === id);
}

// Função para atualizar uma vaga
function updateVaga(id, dadosAtualizados) {
  const vagaIndex = vagas.findIndex((vaga) => vaga.id === id);

  if (vagaIndex === -1) return null; // Vaga não encontrada

  vagas[vagaIndex] = { ...vagas[vagaIndex], ...dadosAtualizados };

  return vagas[vagaIndex];
}

// Função para deletar uma vaga
function deleteVaga(id) {
  const index = vagas.findIndex((vaga) => vaga.id === id);

  if (index === -1) {
    console.log("Vaga não encontrada");
    return false;
  }

  vagas.splice(index, 1);
  console.log("Vaga deletada");
  return true;
}

module.exports = {
  createVaga,
  getAllVagas,
  getVagaById, // Adiciona a função para obter uma vaga pelo ID
  updateVaga,
  deleteVaga,
};
