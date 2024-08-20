import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import Input from "../input";
import CarrosselFornecedor from "./carrouselFornecedor/index.tsx";

export interface Fornecedor {
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
        `consult_energy_backend/fornecedores/consultar?consumo=${consumo}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ consumo: parseFloat(consumo) }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar fornecedores");
      }

      const data: Fornecedor[] = await response.json();
      if (data.length === 0) {
        setFornecedores([]);
        setError(null);
        throw new Error("Não existe fornecedores que atendam nessas condições");
      }

      setFornecedores(data);
      setError(null);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="w-screen flex items-center justify-center px-4 sm:px-6 md:px-8">
      <form
        className="w-full sm:w-3/4 lg:w-1/2 bg-slate-800 shadow-md rounded-3xl px-8 pt-6 pb-6 mb-4"
        onSubmit={handleSearch}
      >
        <div className="flex justify-center mb-8 pb-6">
          <h1 className="text-white text-2xl ml-5">Buscar - Fornecedores</h1>
        </div>

        <div className="flex flex-col md:flex-row md:justify-around md:items-center md:space-x-4 mb-8 pb-6">
          <div className="w-full md:w-auto">
            <Input
              label="Consumo Mensal"
              id="consumo"
              type="number"
              value={consumo}
              onChange={handleInputChange}
              placeholder="Digite o consumo mensal"
              
            />
          </div>

          <span className="text-rose-700 text-white mt-4 md:mt-0">kWh</span>

          <button
            id="buscar"
            className="bg-black text-white rounded-md py-2 px-6 mt-4 md:mt-0"
          >
            Buscar
          </button>
        </div>

        {error && (
          <div className="flex justify-center text-red-500 text-sm">{error}</div>
        )}

        <div className="flex flex-col justify-between mb-8 pb-6">
          {fornecedores.length > 0 && (
            <CarrosselFornecedor fornecedores={fornecedores} />
          )}
        </div>

        <div className="flex justify-center">
          <Link
            to="/cadastrar_fornecedor"
            className="text-white text-sm md:text-base hover:text-[#383131]"
          >
            Novo Fornecedor
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Consulta;
