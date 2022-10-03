import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import api from './services/api';
import './styles.css';

const App = () => {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  const handleSearch = async () => {
    if (input === '') {
      alert('preencha algum cep!');
      return;
    }
    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput('');
    } catch {
      alert('Erro ao buscar Cep');
    }
  };

  return (
    <div className="container">
      <h1 className="title">Buscar Cep</h1>
      <label>
        <input
          className="search"
          type="text"
          placeholder="Digite um cep..."
          alt="barra de pesquisa de CEP"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></input>
        <button
          className="buttonSearch"
          alt="botao de pesquisa de CEP"
          onClick={handleSearch}
        >
          <FiSearch size={25} color="#000" />
        </button>
      </label>
      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>complemento - {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>
            {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
    </div>
  );
};

export default App;
