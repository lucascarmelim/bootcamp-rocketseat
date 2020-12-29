import React, { useState } from 'react';

import './App.css'
import backgroundImage from './assets/background.jpg'

import Header from './components/Header';

/**
 * Componente
 * Propriedade
 * Estado
 */

function App(){

  const [projects, setProjects] = useState(['Desenvolvimento de app', 'Front-end web']);

  //useState retorna um array com duas posições
  //
  // 1ª Posição - Retorna a variável com o valor inicial
  // 2ª Posição - Retorna uma função para atualizar o valor da variável contida na posição 1

  function handleAddProject() {

    setProjects([...projects, `Novo projeto ${Date.now()}`]);

  }

  return (
    <>
      <Header title="Projects"/>

      <img src={backgroundImage}></img>

      <ul>
        {projects.map(project => <li key={project}>{project}</li>)}
      </ul>

      <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
    </>
  );
}

export default App;