const { response } = require('express');
const express = require('express');
const {uuid, isUuid} = require('uuidv4');
const cors = require('cors');


const app = express();

app.use(cors());
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

/*
  Middleware

  Interceptador de requisições que interrompem totalmente a requisição ou altera dados da requisição

*/

const projects = [];

function logRequests(req, res, next){

  const {method, url} = req;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.log(logLabel);

  return next(); //Chama o próximo middleware

}

function validateProjectId(req, res, next){
  const {id} = req.params;

  if (!isUuid(id)){
    return res.status(400).json({error: 'Invalid project ID.'});
  }

  return next();
}

app.use(logRequests);
app.use('/projects/:id', validateProjectId);

app.get('/projects', (req, res) => {

//   // const query = req.query; Aqui retorna um JSON
  const {title} = req.query; //Aqui já retorna em variaveis separadas

  const results = title
    ? projects.filter(project => project.title.includes(title))
    : projects;

  // console.log(title);
  // console.log(owner);

  return res.json(results);
});

app.post('/projects', (req, res) => {

  const {title, owner} = req.body;

  const project = { id: uuid(), title, owner};
  
  projects.push(project);

  return res.json(project);
});

app.put('/projects/:id', validateProjectId, (req, res) => {
  const {id} = req.params;
  const {title, owner} = req.body;

  const projectIndex = projects.findIndex(project => project.id === id);

  if(projectIndex < 0){
    return res.status(400).json({error: 'Project not found'});
  }

  const project = {
    id,
    title,
    owner
  }

  projects[projectIndex] = project;

  return res.json(project);
});

app.delete('/projects/:id', validateProjectId, (req, res) => {

  const {id} = req.params;

  const projectIndex = projects.findIndex(project => project.id === id);

  if(projectIndex < 0){
    return res.status(400).json({error: 'Project not found'});
  }

  projects.splice(projectIndex, 1);

  return res.status(204).send();
});

app.listen(3333, () => {
  console.log('Servidor iniciado')
});