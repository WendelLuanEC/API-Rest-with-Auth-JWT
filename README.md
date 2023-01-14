# API Rest com autenticação JWT  
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/WendelLuanEC/API-Rest-with-Auth-JWT/blob/master/LICENSE) 

# Sobre o projeto

Essa API foi desenvolvida com o objetivo de treinar os meus conhecimentos em NodeJS, junto com a tecnologia JWT, que permite que minha aplicação seja fielmente
segura, utilizando a estrutura de dados Hash nas operações de login e autenticação.

A aplicação foi desenvolvida, testada e consumida com o Postman, ferramenta que possibilita fazer requisições e receber respostas no algoritmo, com métodos POST e GET,
nesse caso em especial, o app faz conexão direta com o banco de dados não relacional Mongoose. A API conecta-se ao banco de dados, insere novos users,
e faz o uso da tecnologia JWT para realizar a autenticação segura, através da criptografia do Hash. E retorna ao usuário se o cadastro de usuário foi feito 
corretamente, ou se houve algum problema de conexão.


## Cadastro de Usuário
![Register](https://github.com/WendelLuanEC/assets/blob/master/JWT1.png)


## Login 
![Login](https://github.com/WendelLuanEC/assets/blob/master/JWT2.png)


## Busca de Usuário por ID
![search](https://github.com/WendelLuanEC/assets/blob/master/JWT3.png)


# Tecnologias utilizadas
## Back end
- NodeJS
- Express
- JsonWebToken - JWT
- Mongoose database
- bcrypt

# Como executar o projeto

## Back end
Pré-requisitos: NodeJs v12.22.9 ou superior

```bash
# clonar repositório
git clone https://github.com/devsuperior/sds1-wmazoni

# entrar na pasta do projeto back end
cd backend

# executar o projeto
./mvnw spring-boot:run
```

## Front end web
Pré-requisitos: npm / yarn

```bash
# clonar repositório
git clone https://github.com/WendelLuanEC/API-Rest-with-Auth-JWT

# entrar na pasta do projeto
cd API-Rest-with-JWT

# instalar dependências
npm install

# executar o projeto
npm start
```

# Autor

Wendel Luan

https://www.linkedin.com/in/wendel-luan-sousa-batista-7359a9251/
