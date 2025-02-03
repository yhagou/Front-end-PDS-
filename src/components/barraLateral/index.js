import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoDebug from "../../img/logo-debug.png";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../service/api";
import { userStorage } from "../../utils/userStorage";
import { chatStorage } from "../../utils/chatStorage";
import "./style.css";

export function BarraLateral({ onChatSelect }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const user = userStorage.getUser();
  const navigate = useNavigate();

  const { isFetching, data, isError, error } = useQuery({
    queryKey: ["getChatUser"],
    queryFn: () => api.chatUser(JSON.parse(user).data.id),
  });

  const handleChatSelect = (chat) => {
    chatStorage.setCurrentChat(chat);
    setSelectedChatId(chat.chatId);
    if (onChatSelect) {
      onChatSelect(chat);
    }
  };

  const handleNewChat = () => {
    const newChat = {
      chatId: Date.now(),
      messages: [],
    };
    chatStorage.setCurrentChat(newChat);
    setSelectedChatId(newChat.chatId);
    if (onChatSelect) {
      onChatSelect(newChat);
    }
  };

  const handleLogout = () => {
    userStorage.removeUser();
    chatStorage.clearCurrentChat();
    navigate("/", { replace: true });
  };

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

  if (isFetching) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Erro: {error.message}</div>;
  }

  return (
    <div className="barra-lateral">
      <div className="title-barra">
        <h1>Bem-vindo à IA</h1>
        <h1>do DEBUGBOX</h1>
      </div>
      <button onClick={handleNewChat} className="button button-new-chat">
        Novo Chat
      </button>
      <div className="historico">{data.map(renderChatItem)}</div>

      <div className="bnt-duvida">
        <button onClick={handleLogout} className="button button-logout">
          Sair
        </button>
        {/* 
        // tirei a imagem do logo pq ela estava cortando a lista de chats em tela pequena, mas se quiser colocar de volta é só descomentar
        <img src={LogoDebug} alt="Logo Debug" />
        */}
      </div>
    </div>
  );
}
