import axios from "axios";

const client = axios.create({
  baseURL: "http://127.0.0.1:3024",
});

async function create(data) {
  const response = await client.post("/users", data);
  return response;
}

async function login(data) {
  const response = await client.post("/users/login", data);
  return response;
}

async function chatUser(userId) {
  const response = await client.get(`/chat/user/${userId}`);
  console.log(response.data);
  return response.data;
}

async function chat(data) {
  const response = await client.post("/chat", data);
  return response.data;
}

export const api = {
  create,
  login,
  chatUser,
  chat,
};
