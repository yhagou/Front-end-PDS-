import { useState } from "react";
import "./login.scss";
import { FaRegUser } from "react-icons/fa"; // Ícone de usuário
import { LuEye } from "react-icons/lu"; // Ícone de olho aberto (mostrar senha)
import { LuEyeClosed } from "react-icons/lu"; // Ícone de olho fechado (ocultar senha)
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../service/api";
import { userStorage } from "../../utils/userStorage";

// Componente responsável pela tela de login
export const Login = () => {
  const navigate = useNavigate(); // Hook para navegação entre páginas
  const [view, setView] = useState(false); // Estado para alternar a visibilidade da senha
  const [user, setUser] = useState(""); // Estado para armazenar o e-mail do usuário
  const [password, setPassword] = useState(""); // Estado para armazenar a senha

  // Função responsável pelo envio do formulário de login
  const handleSubmit = async (event) => {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    try {
      // Chamada à API para autenticar o usuário
      const res = await api.login({
        email: user,
        password: password,
      });

      // Armazena os dados do usuário no localStorage
      userStorage.setUser(JSON.stringify(res.data));

      // Redireciona o usuário para a página do aluno após o login
      navigate("/Aluno", { replace: true });
    } catch (error) {
      // Exibe um alerta caso ocorra um erro na autenticação
      alert(
        "Erro ao fazer login. Verifique suas credenciais e tente novamente."
      );
    }
  };

  // Função para alternar a visibilidade da senha
  const handleClick = () => setView(!view);

  return (
    <div className="pagina-inicial">
      <div className="pagina-imagem">oi</div>{" "}
      {/* Seção reservada para imagem de fundo ou logotipo */}
      <div className="pagina-login">
        <div className="form-pagina">
          {/* Formulário de login */}
          <form onSubmit={handleSubmit} className="form-form">
            <div className="title-form">
              <h1>DEBUGBOX</h1>
              <p>Menos bug, mais inovação</p>
            </div>

            {/* Campos de entrada do formulário */}
            <div className="input-form">
              {/* Campo de e-mail */}
              <input
                type="email"
                placeholder="E-mail"
                onChange={(user) => setUser(user.target.value)}
              />
              <FaRegUser className="icon-user" /> {/* Ícone de usuário */}
              {/* Campo de senha com alternância de visibilidade */}
              <input
                type={view ? "text" : "password"}
                placeholder="Senha"
                onChange={(password) => setPassword(password.target.value)}
              />
              {view ? (
                <LuEye onClick={handleClick} className="icon-eye" />
              ) : (
                <LuEyeClosed onClick={handleClick} className="icon-eye" />
              )}
            </div>

            {/* Botão de envio do formulário */}
            <div className="bnt-form">
              <button>ENTRAR</button>
            </div>
          </form>

          {/* Links para cadastro e recuperação de senha */}
          <p className="p-final">
            Não tem login? Clique <Link to={"/Cadastro"}>aqui!</Link>
          </p>
          <p className="p-final">
            Esqueceu a senha? Clique <Link to={"/Redefinicao"}>aqui!</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
