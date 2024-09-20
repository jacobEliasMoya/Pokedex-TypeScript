import { useEffect,useState } from "react"



function App() {

  interface pokeArray {
    name:string,
    url:string
  }

  const [pokemonObj,setPokemon] = useState<pokeArray | any>();

  const getPokemon = () => {
    // worked into onclick to get random pokemon
    fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=2000')
    .then(response=>response.json())
    .then(res=> {
      const pokeUrl = res.results[Math.floor(Math.random() * res.results.length)]; 
      return fetch(pokeUrl.url)
      })
      .then(response => response.json())
      .then(res=>{
        setPokemon(res)
        console.log(res)
      })
    }

  
  useEffect(()=>{
    
  },[pokemonObj])
  
  return (
    <>
      <h1> 
        <img src={pokemonObj ? pokemonObj.sprites.front_default : '#'} alt="" /><br/>
        <a href={pokemonObj ? pokemonObj.url : '#'} target="_blank" rel="noopener noreferrer"> {pokemonObj ? pokemonObj.name : 'Open Pokeball to Select Random Pokemon'}</a> 
      </h1>


      <div className="pokeball-container">
            <div className="pokeball-inner">
              <div className="pokeball-top">
                <div className="pokeball-button" onClick={getPokemon}>
                </div>
              </div>
              <div className="pokeball-bottom"></div>
          </div>
      </div>     



    </>
  )
}

export default App
