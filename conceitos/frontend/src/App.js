import React, { useState, useEffect } from 'react';
import api from './services/api'

import './App.css'
import backgroundImage from './assets/background.jpg'

import Header from './components/Header';

/*
 * Componente
 * Propriedade
 * Estado
 */

function App(){

  const [projects, setProjects] = useState([]);

  //useState retorna um array com duas posições
  //
  // 1ª Posição - Retorna a variável com o valor inicial
  // 2ª Posição - Retorna uma função para atualizar o valor da variável contida na posição 1


  // useEffect dispara funções quando nós quisermos
  // Ele recebe dois parametros
  // 1° - Qual função eu quero disparar.
  // 2° - Quando eu quero disparar essa função.
  useEffect(() => {
    api.get('/projects').then( response => {
      setProjects(response.data);
    });
  }, [])

  async function handleAddProject() {

    // setProjects([...projects, `Novo projeto ${Date.now()}`]);
    
    const response = await api.post('/projects', {
      "title": `Novo projeto ${Date.now()}`,
      "owner": "Lucas Carmelim"
    })

    const project = response.data;

    setProjects([...projects, project]);

  }

  return (
    <>
      <Header title="Projects"/>

      {/* <img src={backgroundImage}></img> */}

      <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
      </ul>

      <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
    </>
  );
}

export default App;