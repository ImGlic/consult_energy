import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import Input from "../input";
import ImageInput from "../inputImage/index"; // Importando o novo componente de imagem

export interface Fornecedor {
  nome: string;
  logo: File | null;
  estado: string;
  custo_por_kwh: number;
  limite_minimo_kwh: number;
  numero_total_clientes: number;
  avaliacao_media: number;
}

const AdicionarFornecedor: React.FC = () => {
  const [fornecedor, setFornecedor] = useState<Fornecedor>({
    nome: "",
    logo: null,
    estado: "",
    custo_por_kwh: 0.0,
    limite_minimo_kwh: 0,
    numero_total_clientes: 0,
    avaliacao_media: 0.0,
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFornecedor((prevFornecedor) => ({
      ...prevFornecedor,
      [id]: parseFloat(value) || value,
    }));
  };

  const handleFileChange = (file: File | null) => {
    setFornecedor((prevFornecedor) => ({
      ...prevFornecedor,
      logo: file,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!fornecedor.nome.trim()) {
      setError("O campo Nome é obrigatório.");
      return;
    }
    if (!fornecedor.custo_por_kwh) {
      setError("O campo Custo por kWh deve ser maior que 0,0.");
      return;
    }
    if (fornecedor.limite_minimo_kwh <= 0) {
      setError("O campo Limite Mínimo kWh deve ser maior que 0");
      return;
    }

    setError(null);

    const formData = new FormData();
    formData.append("nome", fornecedor.nome);
    formData.append("estado", fornecedor.estado);
    formData.append("custo_por_kwh", fornecedor.custo_por_kwh.toString());
    formData.append("limite_minimo_kwh", fornecedor.limite_minimo_kwh.toString());
    formData.append("numero_total_clientes", fornecedor.numero_total_clientes.toString());
    formData.append("avaliacao_media", fornecedor.avaliacao_media.toString());

    if (fornecedor.logo) {
      formData.append("logo", fornecedor.logo);
    }

    try {
      const response = await fetch(`consult_energy_backend/fornecedores/adicionar?fornecedor=${fornecedor}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erro ao adicionar fornecedor");
      }

      const data = await response.json();
      console.log("Fornecedor adicionado com sucesso:", data);

      setFornecedor({
        nome: "",
        logo: null,
        estado: "",
        custo_por_kwh: 0,
        limite_minimo_kwh: 0,
        numero_total_clientes: 0,
        avaliacao_media: 0,
      });
      setSuccessMessage("Fornecedor adicionado com sucesso!");
    } catch (error: any) {
      setError(error.message);
      setSuccessMessage(null);
    }
  };

  return (
    <div className="w-screen flex items-center justify-center">
      <form
        className="w-1/2 bg-slate-800 shadow-md lg:rounded-3xl lg:px-8 lg:pt-6 lg:pb-6 lg:mb-4"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center mb-8 pb-6">
          <h1 className="text-white text-2xl ml-5">Adicionar Fornecedor</h1>
        </div>

        <div className="flex flex-col mb-4">
          <Input
            label="Nome"
            id="nome"
            type="text"
            value={fornecedor.nome}
            onChange={handleInputChange}
            placeholder="Digite o nome do fornecedor"
          />
          <ImageInput
            label="Logo"
            id="logo"
            onFileChange={handleFileChange}
          />
          <Input
            label="Estado"
            id="estado"
            type="text"
            value={fornecedor.estado}
            onChange={handleInputChange}
            placeholder="Digite o estado"
          />
          <Input
            label="Custo por kWh"
            id="custo_por_kwh"
            type="number"
            value={fornecedor.custo_por_kwh.toString()}
            onChange={handleInputChange}
            placeholder="Digite o custo por kWh"
          />
          <Input
            label="Limite Mínimo kWh"
            id="limite_minimo_kwh"
            type="number"
            value={fornecedor.limite_minimo_kwh.toString()}
            onChange={handleInputChange}
            placeholder="Digite o limite mínimo kWh"
          />
          <Input
            label="Número Total de Clientes"
            id="numero_total_clientes"
            type="number"
            value={fornecedor.numero_total_clientes.toString()}
            onChange={handleInputChange}
            placeholder="Digite o número total de clientes"
          />
          <Input
            label="Avaliação Média"
            id="avaliacao_media"
            type="number"
            value={fornecedor.avaliacao_media.toString()}
            onChange={handleInputChange}
            placeholder="Digite a avaliação média"
          />
        </div>

        {error && (
          <div className="flex justify-center text-red-500 mb-4">{error}</div>
        )}

        {successMessage && (
          <div className="flex justify-center text-green-500 mb-4">
            {successMessage}
          </div>
        )}

        <div className="flex justify-between mt-6">
          <Link
            to="/"
            className="flex items-center text-white hover:text-gray-400"
          >
            Voltar
          </Link>
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            Adicionar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdicionarFornecedor;
