import axios from "axios"; // Importação da biblioteca Axios para fazer requisições HTTP

// Criação de um cliente Axios com uma base URL pré-definida
const client = axios.create({
  baseURL: "http://127.0.0.1:3024", // Define o endereço base do servidor
});

// Função para criar um novo usuário no sistema
async function create(data) {
  const response = await client.post("/users", data); // Envia os dados do usuário para a rota de criação
  return response; // Retorna a resposta do servidor
}

// Função para autenticação de um usuário (login)
async function login(data) {
  const response = await client.post("/users/login", data); // Envia os dados de login para a API
  return response; // Retorna a resposta do servidor
}

// Função para buscar mensagens do usuário no chat
async function chatUser(userId) {
  const response = await client.get(`/chat/user/${userId}`); // Faz uma requisição GET para obter as mensagens do usuário
  console.log(response.data); // Exibe os dados da resposta no console
  return response.data; // Retorna os dados da resposta
}

// Função para enviar mensagens no chat
async function chat(data) {
  const response = await client.post("/chat", data); // Envia os dados da mensagem para a API
  return response.data; // Retorna os dados da resposta
}

// Exportação das funções agrupadas em um objeto 'api' para fácil utilização em outros arquivos
export const api = {
  create,
  login,
  chatUser,
  chat,
};
