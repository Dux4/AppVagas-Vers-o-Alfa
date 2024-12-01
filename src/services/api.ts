// api.js (ou api.ts se você estiver usando TypeScript)
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://26.161.237.227:3000', // Substitua pela URL correta da sua API
});

// Função para buscar as vagas
export const getVagas = async () => {
  try {
    const response = await api.get('/vagas'); // Caminho para o endpoint da API
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;

// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:3000/vagas',
// });

// export default api;
