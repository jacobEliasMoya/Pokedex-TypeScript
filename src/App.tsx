import { useSelector } from "react-redux";
import AdvSearch from "./Layout/AdvSearch"
import InitialPokemonSearch from "./Layout/InitialPokemonSearch"
import { Rootstate } from "./state/store";
import { useEffect } from "react";
import PokemonDetailedView from "./Layout/PokemonDetailedView";


function App() {

  const selectedPokemon = useSelector((state:Rootstate)=>state.selectedPokemon);

  useEffect(()=>{

  },[selectedPokemon])

  return (
    <>
      <AdvSearch/>
      {!selectedPokemon.name ? <InitialPokemonSearch/> : <PokemonDetailedView/>}
    </>
  )

}

export default App
