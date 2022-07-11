import { useState } from "react";
import "./styles.css";
import { FiSearch } from "react-icons/fi";
import { Api } from "../services";

export const HomePage = () => {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === "") {
      alert("Preencha algum CEP!");
      return;
    }

    try {
      const response = await Api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch {
      alert("Erro ao buscar");
      setInput("");
    }
  }
  return (
    <div className="container">
      <h1 className="title"> Buscador de CEP </h1>
      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu CEP..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>
      <main className="main">
        <h2>CEP: {cep.cep}</h2>
        <span>{cep.logradouro}</span>
        <span>Complemento: {cep.complemento}</span>
        <span>{cep.bairro}</span>
        <span>
          {cep.localidade} - {cep.uf}
        </span>
      </main>
    </div>
  );
};
