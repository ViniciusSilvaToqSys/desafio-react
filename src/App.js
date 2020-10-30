import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]); 

  useEffect(()=>{
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  },[]);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Novo Repositorio ${Date.now()}`,
      url: 'www.com.br',
      techs: 'Qualquer coisa'
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(vId) {
    await api.delete(`/repositories/${vId}`);
    
    setRepositories(repositories.filter(
      repository => repository.id !== vId
    ))
  }


  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>          
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
          </li>
        ))}
      </ul>
      
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;