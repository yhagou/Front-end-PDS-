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

// Importação do syntax highlighter para formatação de código nas mensagens da IA
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialOceanic } from "react-syntax-highlighter/dist/cjs/styles/prism";

// Componente de mensagem individual, que exibe o conteúdo e a imagem do remetente
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

// Componente de entrada de chat, onde o usuário pode digitar e enviar mensagens
const ChatInput = ({ onSend, disabled }) => {
  const [input, setInput] = useState("");

  // Função para enviar a mensagem digitada
  const handleSubmit = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  // Permite enviar mensagens ao pressionar Enter
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

// Componente principal do chat do aluno
export const Aluno = () => {
  const [messages, setMessages] = useState([]); // Estado para armazenar mensagens do chat
  const user = userStorage.getUser(); // Obtém informações do usuário
  const userId = JSON.parse(user)?.data?.id; // Extrai o ID do usuário
  const [currentChat, setCurrentChat] = useState(chatStorage.getCurrentChat()); // Obtém o chat atual
  const [isLoading, setIsLoading] = useState(false); // Estado para indicar carregamento
  const messagesEndRef = useRef(null); // Referência para rolagem automática das mensagens

  // Função para formatar as mensagens do chat atual
  const formatMessages = (chat) => {
    if (!chat?.messages) return [];
    return chat.messages.map((msg) => ({
      isUser: msg.role === "user",
      content: msg.content,
    }));
  };

  // Atualiza as mensagens sempre que o chat atual mudar
  useEffect(() => {
    setMessages(formatMessages(currentChat));
  }, [currentChat]);

  // Faz a rolagem automática até a última mensagem sempre que houver nova mensagem
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Configuração da mutação para envio de mensagens
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

  // Função para enviar uma nova mensagem
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
