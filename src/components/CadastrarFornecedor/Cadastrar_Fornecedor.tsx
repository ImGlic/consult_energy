import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom"; // Importe o Link
import Input from "../input";

interface Fornecedor {
  nome: string;
  logo: string;
  estado: string;
  custo_por_kwh: number;
  limite_minimo_kwh: number;
  numero_total_clientes: number;
  avaliacao_media: number;
}

const Consulta: React.FC = () => {
  const [consumo, setConsumo] = useState<string>("");
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConsumo(e.target.value);
  };

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();

    if (consumo.trim() === "") {
      setError("Por favor, informe o consumo mensal.");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/escolha?consumo=${consumo}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ consumo: parseInt(consumo) }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar fornecedores");
      }
      const data: Fornecedor[] = await response.json();
      if (data.length === 0) {
        throw new Error("Não existe fornecedores que atendam nessas condições");
      }

      setFornecedores(data);
      setError(null);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="w-screen flex items-center justify-center">
      <form
        className="w-1/2 bg-slate-800 shadow-md rounded-3xl px-8 pt-6 pb-6 mb-4"
        onSubmit={handleSearch}
      >
        <div className="flex justify-center mb-8 pb-6">
          <h1 className="text-white text-2xl ml-5">Cadastrar - Fornecedores</h1>
        </div>
        <div className="flex flex-row justify-around items-center mb-8 pb-6">
          <Input
            label="Nome do Fornecedor"
            id="descricao"
            type="text"
            value={consumo}
            onChange={handleInputChange}
            placeholder="Digite o nome do Fornecedor"
          />
        </div>

        <div className="flex justify-between">
          <Link to="/" className="text-white mt-10 hover:text-[#383131]">
            Voltar
          </Link>

          <button id="Cadastrar" className="bg-black mt-7">
            Cadastrar
          </button>
        </div>
        {error && <div className="text-red-500">{error}</div>}
      </form>
    </div>
  );
};

export default Consulta;
