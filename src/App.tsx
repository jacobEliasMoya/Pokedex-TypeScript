import { useEffect,useState } from "react"
import AdvSearch from "./Layout/AdvSearch";

function App() {

// interface pokeArray {
//   name:string,
//   url:string
// }

const initialCount:number = 12;

const [pokeList,setList] = useState<any>([]);
const [pokemonObj,setPokemon] = useState<any>();

const getPokemon = () => {
  // worked into onclick to get random pokemon
  fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=2000')
  .then(response=>response.json())
  .then(res=> {

    let i=0;

    do{
      i++;
      const pokeUrl = res.results[Math.floor(Math.random() * res.results.length)]; 
      pokeList.push(pokeUrl);
      setList((pokeList: any) => [...pokeList,pokeUrl] );

    } while ( i < initialCount)
    
    const pokeUrl = res.results[Math.floor(Math.random() * res.results.length)]; 
    return fetch(pokeUrl.url)
    })

    .then(response => response.json())
    .then(res=>{
      setPokemon(res)
      // console.log(res)
    })
  
  }

useEffect(()=>{
  console.log(pokeList);
  
},[])

return (
  <>
    <AdvSearch/>
    
    <div className="large-wrapper">
      <div className="w-100 py-5 mt-5"></div>
      <div className="row container-fluid text-left justify-content-center">
       {
        pokeList.map((item:any)=>{
          return(

            <div className="col-md-4" id={pokemonObj ? pokemonObj.id : '1'}>
            <div className="wrap">
            <img src={pokemonObj ? pokemonObj.sprites.front_default : '#'} alt="" className={pokemonObj ? 'd-inline' : 'd-none' } /><br/>
            </div>
  
            <p className="mb-0 mt-4 h5">{pokemonObj ? pokemonObj.id : 'Pokemon ID '}</p>
            <p className="h3 mb-4">{pokemonObj ? pokemonObj.name : 'Pokemon Name'}</p>
  
          </div>  

          )
        })

       }
      </div>
    </div>

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
