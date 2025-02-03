import { useState } from "react";
import "./login.scss";
import { FaRegUser } from "react-icons/fa";
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../service/api";
import { userStorage } from "../../utils/userStorage";

export const Login = () => {
  const navigate = useNavigate();
  const [view, setView] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await api.login({
        email: user,
        password: password,
      });
      userStorage.setUser(JSON.stringify(res.data));
      navigate("/Aluno", { replace: true });
    } catch (error) {
      alert(
        "Erro ao fazer login. Verifique suas credenciais e tente novamente."
      );
    }
  };
  const handleClick = () => setView(!view);

  return (
    <div className="pagina-inicial">
      <div className="pagina-imagem">oi</div>
      <div className="pagina-login">
        <div className="form-pagina">
          <form onSubmit={handleSubmit} className="form-form">
            <div className="title-form">
              <h1>DEBUGBOX</h1>
              <p>Menos bug, mais inovação</p>
            </div>
            <div className="input-form">
              <input
                type="email"
                placeholder="E-mail"
                onChange={(user) => setUser(user.target.value)}
              />
              <FaRegUser className="icon-user" />
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
            <div className="bnt-form">
              <button>ENTRAR</button>
            </div>
          </form>
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
