import { useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";

import { Link } from "react-router-dom";

export const Redefinicao = () => {
  const [user, setUser] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!user) {
      alert(
        "Todos os campos são obrigatórios! Preencha todos os campos antes de continuar."
      );
      return;
    }

    alert("Dados enviados com sucesso!");
    console.log(user);
  };

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
                placeholder="Digite seu email cadastrado"
                onChange={(e) => setUser(e.target.value)}
              />
              <MdOutlineMailOutline className="icon-user" />
            </div>
            <div className="bnt-form">
              <button>ENVIAR</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
