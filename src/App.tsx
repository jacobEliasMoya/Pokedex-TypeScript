import { useSelector } from "react-redux";
import AdvSearch from "./Layout/AdvSearch"
import InitialPokemonSearch from "./Layout/InitialPokemonSearch"
import { Rootstate } from "./state/store";
import { useEffect } from "react";


function App() {

  const selectedPokemon = useSelector((state:Rootstate)=>state.selectedPokemon);

  useEffect(()=>{
    console.log(selectedPokemon.name)
  },[selectedPokemon])

  return (
    <>
      <AdvSearch/>
      {!selectedPokemon.name ? <InitialPokemonSearch/> : <h1> Ready to Add indivdual pokepage </h1>}

    </>
  )

}

export default App
