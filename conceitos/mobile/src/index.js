import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, StatusBar, ScrollView, FlatList, TouchableOpacity } from 'react-native';

import api from './services/api'

// Não possuem valor semântico (significado - Exemplo é o footer ser utilizado como rodapé);
// Os componentes não possuem estilização própria
// Todos componentes possuem por padrão a configuração "display: flex"

// View: div, footer, header, main, aside, section
// Text: p, span, strong, h1, h2, h5

export default function App() {
  
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    api.get('projects').then( response => {
      setProjects(response.data);
    })
  }, []);

  async function handleAddProject() {
    const response = await api.post('projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: 'Diego Fernandes'
    });

    setProjects([...projects, response.data]);
  }

  return (
    
    <>
      <StatusBar barStyle='light-content' backgroundColor='#7159c1'/>
      
      <SafeAreaView style={styles.container}>
        <FlatList 
          style={styles.container}
          data={projects} 
          keyExtractor={ project => project.id }
          renderItem={({ item }) => (
            <Text style={styles.project}>{item.title}</Text>
          )}
        />


      <TouchableOpacity 
        activeOpacity={0.9} 
        style={styles.button}
        onPress={handleAddProject}
      >
        <Text>Adicionar projeto</Text>
      </TouchableOpacity>
      </SafeAreaView>
    </>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1'
  },
  project: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#fff',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16
  }
})