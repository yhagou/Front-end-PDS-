import { BrowserRouter, Route, Routes } from "react-router-dom"; // Importação das ferramentas de roteamento do React Router
import "./app.css"; // Importação do arquivo de estilos CSS
import { Login } from "./Layout/Login/Login"; // Importação do componente de Login
import { Cadastro } from "./Layout/Cadastro/Cadastro"; // Importação do componente de Cadastro
import { Redefinicao } from "./Layout/Redefinicao/Redefinicao"; // Importação do componente de Redefinição de Senha
import { Aluno } from "./Layout/Aluno/Aluno"; // Importação do componente Aluno

// Importação do React Query para gerenciamento de estado assíncrono
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Criação de uma instância do QueryClient para ser usada no React Query
const queryClient = new QueryClient();

function App() {
  return (
    // Provedor do React Query para gerenciar estados de requisições assíncronas
    <QueryClientProvider client={queryClient}>
      <div className="App">
        {/* Definição do roteamento da aplicação */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />{" "}
            {/* Rota para a página de login */}
            <Route path="/Cadastro" element={<Cadastro />} />{" "}
            {/* Rota para a página de cadastro */}
            <Route path="/Redefinicao" element={<Redefinicao />} />{" "}
            {/* Rota para a redefinição de senha */}
            <Route path="/Redefinicao" element={<Redefinicao />} />{" "}
            {/* Rota duplicada (pode ser removida) */}
            <Route path="/Aluno" element={<Aluno />} />{" "}
            {/* Rota para a área do aluno */}
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App; // Exportação do componente principal da aplicação
