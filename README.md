
# API Internet Bank - DOCK

Micro Servicos para endpoint de serviços bancarios



## Stack utilizada

**Back-end:** Node, Express, Babel, TypeScript, mongoose, Jest, MongoDB


## Funcionalidades

- **POST** /api/v1/portador/novo
- **DELETE** /api/v1/portador/remover/**{cpf}**
- **POST** /api/v1/conta/abrir
- **GET** /api/v1/conta/consulta/**{cpf}**
- **PUT** /api/v1/conta/encerrar
- **PUT** /api/v1/conta/bloquear
- **PUT** /api/v1/conta/desbloquear
- **POST** /api/v1/conta/depositar
- **POST** /api/v1/conta/saque
- **GET** /api/v1/conta/extrato-periodo/**{data}**/**{data}**/**{conta}**/**{agencia}**

## Testes POSTMAN

- **Dock.postman_collection.json** exemplos de chamadas no **POSTMAN**

## MongoDB URI

- Alterar em src/providers/database/implementation/MongoDB.ts

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/manoelbplima/dock
```

Entre no diretório do projeto (Micro Serviço - PORTADOR)

```bash
  cd portador
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run start
```

Entre no diretório do projeto (Micro Serviço - CONTA)

```bash
  cd conta
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run start
```


## Melhorias

Foram aplicados no projeto

- Teste unitário
- SOLID
- Design Patterns

## Roadmap

- Inclusão do RabbitMQ para comunicação entre serviços

- Inclusão de autenticação com JWT Token

- Inclusão do .ENV