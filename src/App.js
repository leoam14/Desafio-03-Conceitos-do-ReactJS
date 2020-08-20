import React, {useState, useEffect} from "react";

import "./styles.css";

import api from "./services/api"

function App() {
  
  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get("/repositories").then(response => {
      console.log(response.data);
      setRepository(response.data);
    });
  },[]);
  
  async function handleAddRepository() {
    const testAdd = {
      url: "https://github.com/Rocketseat/umbriel",
      title: `Test3 ${Date.now()}`,
      techs: ["React", "ReactNative", "TypeScript", "ContextApi"]
    }
    api.post("repositories", testAdd).then( request => {
      console.log(request.data)    
      setRepository([...repositories,request.data])  
    }
    )
  }

  async function handleRemoveRepository(id) {
    console.log(id)
    api.delete(`repositories/${id}`).then( response => {
      console.log(response)
      var aux = [...repositories];
      const index = repositories.findIndex(obj => obj.id === id)
      aux.splice(index,1)
      setRepository(aux);
    }
    )
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map( repository => {
          if (repository !== null) {
          return(
          <li key={repository.title}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
          );}
          })
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
