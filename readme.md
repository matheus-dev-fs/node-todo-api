# Node Todo API

API REST simples para gerenciamento de tarefas (To-Do List) desenvolvida durante o curso de Node.js da B7Web.  
O projeto foi aprimorado com validações mais robustas e melhor separação de responsabilidades em relação à versão original do curso.

## Funcionalidades

- Criar nova tarefa
- Listar todas as tarefas
- Atualizar tarefa existente
- Remover tarefa
- Validações completas de campos e tipos

## Tecnologias

- **Node.js** com **TypeScript**
- **Express** - Framework web
- **Sequelize** - ORM para banco de dados
- **PostgreSQL** - Banco de dados
- **CORS** - Habilitado para requisições cross-origin
- **dotenv** - Gerenciamento de variáveis de ambiente
- **tsx** - Execução de TypeScript com hot reload

## Estrutura do Projeto

- **src/controllers**: Lógica dos endpoints (CRUD de tarefas)
- **src/models**: Definição do modelo Todo com Sequelize
- **src/routes**: Rotas da API
- **src/instances**: Configuração da conexão com PostgreSQL
- **src/utils**: Utilitários e validações customizadas

## Endpoints da API

### `GET /todos`
Retorna todas as tarefas.

### `POST /todos`
Cria uma nova tarefa.  
**Body:** `{ "title": string, "done"?: boolean }`

### `PUT /todos/:id`
Atualiza uma tarefa existente.  
**Body:** `{ "title"?: string, "done"?: boolean }`

### `DELETE /todos/:id`
Remove uma tarefa.

## Melhorias Implementadas

Em relação à versão original do curso, foram adicionadas:

- Validações detalhadas de campos obrigatórios
- Verificação de tipos de dados (ex: `done` deve ser boolean)
- Tratamento de erros mais robusto com status HTTP apropriados
- Validação de IDs antes de buscar no banco
- Mensagens de erro descritivas
- Utilitários para validações reutilizáveis
- Tipagem TypeScript mais rigorosa

## Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
PG_DB=seu_banco
PG_USER=seu_usuario
PG_PASSWORD=sua_senha
PG_HOST=localhost
PG_PORT=5432
```

## Instalação

```bash
npm install
```

## Executando

```bash
npm run dev
```

A API estará disponível em `http://localhost:3000`

## Modelo de Dados

**Todo:**
- `id` (integer, auto-increment, primary key)
- `title` (string, obrigatório)
- `done` (boolean, padrão: false)

## Créditos

Projeto base desenvolvido no curso de Node.js da [B7Web](https://b7web.com.br/).  
Instrutor: Bonieky Lacerda


## Licença

ISC