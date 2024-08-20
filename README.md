# Projeto Fornecedores de Energia

Este projeto é uma aplicação web para consultar e adicionar fornecedores de energia elétrica. Ele permite aos usuários buscar fornecedores com base em seu consumo de energia e adicionar novos fornecedores ao sistema.

## Funcionalidades

### Consulta de Fornecedores

- **Buscar Fornecedores**: Permite que os usuários pesquisem fornecedores de energia elétrica com base no consumo mensal informado.
- **Carrossel de Fornecedores**: Exibe os fornecedores encontrados em um carrossel interativo, mostrando detalhes como nome, logo, estado e custo por kWh.

### Adicionar Fornecedor

- **Formulário de Adição**: Permite que os usuários adicionem novos fornecedores ao sistema, fornecendo informações como nome, logo, estado, custo por kWh, limite mínimo kWh, número total de clientes e avaliação média.
- **Validações**: Garante que campos obrigatórios não estejam vazios e que os valores sejam válidos antes de enviar o formulário.

## Tecnologias Utilizadas

- **Frontend**: React com TypeScript, Tailwind CSS
- **Backend**: FastAPI
- **Animações**: react-spring
- **Ícones**: react-icons

## Pré-requisitos

Antes de rodar o projeto, você precisará de:

- Node.js e npm instalados (para o frontend)
- Python e pip instalados (para o backend)
- Ambiente virtual Python (opcional, mas recomendado para o backend)

## Configuração e Execução

### Backend

1. **Clone o Repositório**:

   ```bash
   git clone https://github.com/ImGlic/api_consult-energy.git
   cd api_consult-energy

   ```

2. **Instale as Dependências**:

- Navegue até o diretório do backend e crie um ambiente virtual:

  ```bash
  cd backend
  python -m venv venv
  source venv/bin/activate  # Para Windows use: venv\Scripts\activate
  pip install -r requirements.txt
  ```

3. **Inicie o servidor**:

- Navegue até o diretório do backend e crie um ambiente virtual:

  ```bash
  uvicorn main:app --reload
  O servidor estará disponível em http://127.0.0.1:8000
  ```

### FrontEnd

1. **Clone o Repositório**:

  ```bash
  git clone https://github.com/ImGlic/consult_energy.git
  cd consult_energy
  ```

2. **Instale as Dependências**:

- npm install


3. **Inicie o servidor**:

- npm run dev
```O frontend estará disponível em http://localhost:3000"```

Para buildar utilize

- npm run build


### Docker

Estamos utilizando o Docker nesse projeto, ao clonar. Para buildar e  iniciar o projeto com docker utilize 

  ```bash 
    Docker compose up --build
  ```

Caso for só iniciar o projeto utilize o comando 

  ```bash 
    Docker compose up
  ```

Para parar o docker pressione CRTL + C duas vezes 

      OU 

Digite no terminal o comando: 

  ```bash 
    Docker compose down 
  ```

### Estrutura do Projeto

- frontend/: Contém o código-fonte do frontend, incluindo componentes React e configurações do projeto.
- backend/: Contém o código-fonte do backend, incluindo a API desenvolvida com FastAPI.


