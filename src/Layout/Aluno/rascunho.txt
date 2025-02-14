import "./styles.scss";
import AvatarUser from "../../img/Avatar User.png";
import AvatarGPT from "../../img/Avatar ChatGPT.png";
import { IoSendSharp } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";

import { useMutation } from "@tanstack/react-query";
import { api } from "../../service/api";
import { userStorage } from "../../utils/userStorage";
import { chatStorage } from "../../utils/chatStorage";
import { BarraLateral } from "../../components/barraLateral";

// Ajuste na importação do react-syntax-highlighter
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// Tente primeiro com esta linha (Alternativa 1):
import { materialOceanic } from "react-syntax-highlighter/dist/cjs/styles/prism";
// Caso não funcione, experimente uma das alternativas no comentário acima.

const Message = ({ isUser, content, avatar }) => (
  <div className={`resposta-${isUser ? "aluno" : "ia"}`}>
    <img src={avatar} className={`icon-${isUser ? "aluno" : "ia"}`} />
    <div className={`message-content-${isUser ? "aluno" : "ia"}`}>
      {isUser ? (
        content
      ) : (
        <SyntaxHighlighter language="javascript" style={materialOceanic}>
          {content}
        </SyntaxHighlighter>
      )}
    </div>
  </div>
);

const ChatInput = ({ onSend, disabled }) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="input-chat">
      <textarea
        placeholder="Digite aqui seu script com a dúvida..."
        value={input}
        id="text-aluno"
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={disabled}
      />
      <IoSendSharp
        onClick={handleSubmit}
        disabled={disabled}
        className="icon-send"
      />
    </div>
  );
};

export const Aluno = () => {
  const [messages, setMessages] = useState([]);
  const user = userStorage.getUser();
  const userId = JSON.parse(user)?.data?.id;
  const [currentChat, setCurrentChat] = useState(chatStorage.getCurrentChat());
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Função auxiliar para formatar as mensagens do chat
  const formatMessages = (chat) => {
    if (!chat?.messages) return [];
    return chat.messages.map((msg) => ({
      isUser: msg.role === "user",
      content: msg.content,
    }));
  };

  useEffect(() => {
    setMessages(formatMessages(currentChat));
  }, [currentChat]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const chatMutation = useMutation({
    mutationFn: (prompt) =>
      api.chat({
        prompt,
        userId,
        chatId: currentChat?.chatId,
      }),
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (response, prompt) => {
      setIsLoading(false);
      if (Array.isArray(response.content)) {
        const lastMessages = response.content.slice(-2);

        const newMessages = lastMessages.map((msg) => ({
          isUser: msg.role === "user",
          content: msg.content,
        }));

        setMessages((prev) => [...prev, ...newMessages]);
      } else {
        setMessages((prev) => [
          ...prev,
          { isUser: true, content: prompt },
          { isUser: false, content: response.content },
        ]);
      }
    },
    onError: (error) => {
      setIsLoading(false);
      console.error("Erro ao enviar mensagem:", error);
      alert("Ocorreu um erro ao enviar sua mensagem. Tente novamente.");
    },
  });

  const handleSendMessage = (message) => {
    chatMutation.mutate(message);
  };

  return (
    <div className="interface-aluno">
      <BarraLateral onChatSelect={setCurrentChat} />
      <div className="chat-principal">
        <div className="mensagens">
          {messages.map((message, index) => (
            <div
              key={index}
              className={message.isUser ? "tela-aluno" : "tela-ia"}
            >
              <Message
                isUser={message.isUser}
                content={message.content}
                avatar={message.isUser ? AvatarUser : AvatarGPT}
              />
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {isLoading && <div className="loading-indicator">Carregando...</div>}
        <ChatInput
          onSend={handleSendMessage}
          disabled={chatMutation.isPending}
        />
      </div>
    </div>
  );
};
