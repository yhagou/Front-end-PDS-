import { useState } from "react";
import "./styles.scss";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../service/api";
import { userStorage } from "../../utils/userStorage";

export const Cadastro = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  // const [userType, setUserType] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!nome || !email || !password || !confPassword) {
      alert(
        "Todos os campos são obrigatórios! Preencha todos os campos antes de continuar."
      );
      return;
    }

    if (password !== confPassword) {
      alert("As senhas não coincidem! Verifique e tente novamente.");
      return;
    }
    try {
      const res = await api.create({
        name: nome,
        email: email,
        password: password,
        isTeacher: false,
      });
      userStorage.setUser(JSON.stringify(res.data));
      navigate("/Aluno", { replace: true });
    } catch (error) {
      alert(error);
    }
    //alert("Cadastro realizado com sucesso!");
    //console.log(nome, email, password, confPassword, userType, turma);

    // Limpar os campos após o envio bem-sucedido
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
            <div className="radio-cadastro">
              <div className="radio-1">
                <p>Professor</p>
              </div>
              <div className="radio-2">
                <p>Aluno</p>
              </div>
            </div>
            <div className="bnt-form">
              <button>Cadastrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
