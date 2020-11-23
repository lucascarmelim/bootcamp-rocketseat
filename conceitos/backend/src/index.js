const express = require('express');

const app = express();

app.use(express.json());

/*

  Métodos HTTP

  GET: Buscar informações do back-end
  POST: Criar uma informação no back-end
  PUT/PATCH: Alterar uma informação no back-end
  DELETE: Deletar uma informação no back-end

*/

/*

  Tipos de parâmetros

  Query Params: Filtros e paginação
  Route Params: Identificar recursos (Atualizar/Deletar)
  Request Body: Conteúdo na hora de criar ou editar um recurso

*/

app.get('/projects', (req, res) => {

  const {title, owner} = req.query;

  console.log(title);
  console.log(owner);

  return res.json([
    'Projeto 1',
    'Projeto 2'
  ]);
});

app.post('/projects', (req, res) => {

  const body = req.body;

  console.log(body);
  
  return res.json([
    'Projeto 1',
    'Projeto 2',
    'Projeto 3'
  ]);
});

app.put('/projects/:id', (req, res) => {
  const params = req.params;

  console.log(params)

  return res.json([
    'Projeto 1',
    'Projeto 2',
    'Projeto 4'
  ]);
});

app.delete('/projects/:id', (req, res) => {
  return res.json([
    'Projeto 2',
    'Projeto 3'
  ]);
});

app.listen(3333, () => {
  console.log('Servidor iniciado')
});