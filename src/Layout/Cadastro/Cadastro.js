import { useState } from "react";
import "./styles.scss";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../service/api";
import { userStorage } from "../../utils/userStorage";

// Componente responsável pela tela de cadastro de usuários
export const Cadastro = () => {
  const navigate = useNavigate(); // Hook para navegação entre páginas
  const [nome, setNome] = useState(""); // Estado para armazenar o nome do usuário
  const [email, setEmail] = useState(""); // Estado para armazenar o e-mail do usuário
  const [password, setPassword] = useState(""); // Estado para armazenar a senha
  const [confPassword, setConfPassword] = useState(""); // Estado para confirmar a senha

  // Função responsável pelo envio do formulário de cadastro
  const handleSubmit = async (event) => {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    // Validação para garantir que todos os campos estão preenchidos
    if (!nome || !email || !password || !confPassword) {
      alert(
        "Todos os campos são obrigatórios! Preencha todos os campos antes de continuar."
      );
      return;
    }

    // Validação para garantir que as senhas coincidem
    if (password !== confPassword) {
      alert("As senhas não coincidem! Verifique e tente novamente.");
      return;
    }

    try {
      // Chamada à API para criar o usuário
      const res = await api.create({
        name: nome,
        email: email,
        password: password,
        isTeacher: false, // Define que o usuário será um aluno por padrão
      });

      // Armazena os dados do usuário no localStorage
      userStorage.setUser(JSON.stringify(res.data));

      // Redireciona o usuário para a página do aluno após o cadastro
      navigate("/Aluno", { replace: true });
    } catch (error) {
      alert(error); // Exibe um alerta caso ocorra um erro na requisição
    }

    // Limpa os campos do formulário após o envio bem-sucedido
    setNome("");
    setEmail("");
    setPassword("");
    setConfPassword("");
  };

  return (
    <div className="pagina-cadastro">
      <div className="inicial-cadastro">
        <div className="form-cadastro">
          <div className="title-cadastro">
            <h1>Faça seu cadastro!</h1>
          </div>
          {/* Formulário de cadastro */}
          <form onSubmit={handleSubmit} className="form-form-cadastro">
            <div className="input-cadastro">
              <p>Nome completo:</p>
              <input
                type="text"
                onChange={(e) => setNome(e.target.value)}
                value={nome}
              />
              <p>Seu endereço de email:</p>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <p>Crie sua senha:</p>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <p>Digite sua senha novamente:</p>
              <input
                type="password"
                onChange={(e) => setConfPassword(e.target.value)}
                value={confPassword}
              />
            </div>

            {/* Área reservada para possível seleção do tipo de usuário */}
            <div className="radio-cadastro">
              <div className="radio-1">
                <p>Professor</p>
              </div>
              <div className="radio-2">
                <p>Aluno</p>
              </div>
            </div>

            {/* Botão de envio do formulário */}
            <div className="bnt-form">
              <button>Cadastrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
