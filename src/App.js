import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import { useEffect, useState } from "react";
import PokemonThumbnail from "./components/PokemonThumbnail";
const axios = require('axios').default;
function App() {

  const [allPokemons, setAllPokemons] = useState([])
  const [loadMorePokemons, setLoadMorePokemons] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')
  const getAllPokemons = async() => {
    const res = await axios(loadMorePokemons)
    const data = await res.data

    setLoadMorePokemons(data.next)

    function createPokemonObject(result){
      result.forEach(async (pokemon) =>{
        const res = await axios(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await res.data
        setAllPokemons(currentList => [...currentList, data])

        
      })
    }
    createPokemonObject(data.results)
    //await console.log(allPokemons)

    //console.log(data)
  }

  useEffect(() => {
    getAllPokemons()
  })


  return (
    <div className="app-container">
      <h1>Pokemons</h1>
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.map((pokemon, index) => 
            <PokemonThumbnail
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.sprites.other.dream_world.front_default}
            type={pokemon.types[0].type.name}
            key={index}
            />
            )}
        </div>

        <Button block={true} color="primary" onClick={()=> getAllPokemons()}>Load More Pokemons</Button>
        </div>
    </div>
  );
}

export default App;
