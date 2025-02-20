import { useState } from "react"; // Importação do hook useState para gerenciar estado local
import { MdOutlineMailOutline } from "react-icons/md"; // Importação do ícone de e-mail
import { Link } from "react-router-dom"; // Importação do Link para navegação entre páginas

// Componente responsável pela página de redefinição de senha
export const Redefinicao = () => {
  // Estado para armazenar o e-mail do usuário
  const [user, setUser] = useState("");

  // Função chamada ao enviar o formulário
  const handleSubmit = (event) => {
    event.preventDefault(); // Impede o comportamento padrão do formulário

    // Validação: verifica se o campo de e-mail foi preenchido
    if (!user) {
      alert(
        "Todos os campos são obrigatórios! Preencha todos os campos antes de continuar."
      );
      return;
    }

    // Simulação de envio bem-sucedido
    alert("Dados enviados com sucesso!");
    console.log(user); // Exibe o e-mail no console
  };

  return (
    <div className="pagina-inicial">
      {/* Seção de imagem ou introdução */}
      <div className="pagina-imagem">oi</div>

      {/* Seção principal do formulário de redefinição de senha */}
      <div className="pagina-login">
        <div className="form-pagina">
          <form onSubmit={handleSubmit} className="form-form">
            {/* Título da página */}
            <div className="title-form">
              <h1>DEBUGBOX</h1>
              <p>Menos bug, mais inovação</p>
            </div>

            {/* Campo de entrada para o e-mail */}
            <div className="input-form">
              <input
                type="email"
                placeholder="Digite seu email cadastrado"
                onChange={(e) => setUser(e.target.value)} // Atualiza o estado conforme o usuário digita
              />
              <MdOutlineMailOutline className="icon-user" />{" "}
              {/* Ícone de e-mail */}
            </div>

            {/* Botão para enviar a solicitação de redefinição */}
            <div className="bnt-form">
              <button>ENVIAR</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
