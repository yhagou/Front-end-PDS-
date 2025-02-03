import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app.css";
import { Login } from "./Layout/Login/Login";
import { Cadastro } from "./Layout/Cadastro/Cadastro";
import { Redefinicao } from "./Layout/Redefinicao/Redefinicao";
import { Aluno } from "./Layout/Aluno/Aluno";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Cadastro" element={<Cadastro />} />
          <Route path="/Redefinicao" element={<Redefinicao />} />
          <Route path="/Redefinicao" element={<Redefinicao />} />
          <Route path="/Aluno" element={<Aluno />} />
        </Routes>
      </BrowserRouter>
    </div>
    </QueryClientProvider>
  );
}

export default App;
