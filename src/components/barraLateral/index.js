import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoDebug from "../../img/logo-debug.png";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../service/api";
import { userStorage } from "../../utils/userStorage";
import { chatStorage } from "../../utils/chatStorage";
import "./style.css";

// Componente de barra lateral para gerenciamento de chats
export function BarraLateral({ onChatSelect }) {
  // Estados para gerenciar hover e chat selecionado
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedChatId, setSelectedChatId] = useState(null);

  // Obtém o usuário armazenado no localStorage
  const user = userStorage.getUser();

  // Hook de navegação para redirecionamento de rotas
  const navigate = useNavigate();

  // Busca os chats do usuário utilizando React Query
  const { isFetching, data, isError, error } = useQuery({
    queryKey: ["getChatUser"],
    queryFn: () => api.chatUser(JSON.parse(user).data.id),
  });

  // Função para selecionar um chat e armazená-lo no chatStorage
  const handleChatSelect = (chat) => {
    chatStorage.setCurrentChat(chat);
    setSelectedChatId(chat.chatId);
    if (onChatSelect) {
      onChatSelect(chat);
    }
  };

  // Função para criar um novo chat
  const handleNewChat = () => {
    const newChat = {
      chatId: Date.now(), // Gera um ID único baseado no timestamp
      messages: [],
    };
    chatStorage.setCurrentChat(newChat);
    setSelectedChatId(newChat.chatId);
    if (onChatSelect) {
      onChatSelect(newChat);
    }
  };

  // Função para logout, removendo dados do usuário e chats armazenados
  const handleLogout = () => {
    userStorage.removeUser();
    chatStorage.clearCurrentChat();
    navigate("/", { replace: true }); // Redireciona para a página inicial
  };

  // Renderiza um item da lista de chats
  const renderChatItem = (item, index) => {
    const isSelected = selectedChatId === item.chatId;
    const isHovered = hoveredIndex === index;

    return (
      <div
        key={index}
        className={`historico-item ${isSelected ? "selected" : ""}`}
        onClick={() => handleChatSelect(item)}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
        style={{
          border: isHovered ? "1px solid #ccc" : "none",
        }}
      >
        <p style={{ color: "#f0f0f0" }}>{item.messages[0].content}</p>
      </div>
    );
  };

  // Se a requisição ainda está carregando, exibe uma mensagem de carregamento
  if (isFetching) {
    return <div>Carregando...</div>;
  }

  // Se ocorreu um erro, exibe a mensagem de erro
  if (isError) {
    return <div>Erro: {error.message}</div>;
  }

  return (
    <div className="barra-lateral">
      <div className="title-barra">
        <h1>Bem-vindo à IA</h1>
        <h1>do DEBUGBOX</h1>
      </div>

      {/* Botão para iniciar um novo chat */}
      <button onClick={handleNewChat} className="button button-new-chat">
        Novo Chat
      </button>

      {/* Renderiza o histórico de chats */}
      <div className="historico">{data.map(renderChatItem)}</div>

      <div className="bnt-duvida">
        {/* Botão de logout */}
        <button onClick={handleLogout} className="button button-logout">
          Sair
        </button>

        {/* Imagem do logo (comentada para evitar sobreposição em telas pequenas) */}
        {/* <img src={LogoDebug} alt="Logo Debug" /> */}
      </div>
    </div>
  );
}
