import { useEffect,useState } from "react"
import AdvSearch from "./Layout/AdvSearch";
import Button from "./Components/Button";

function App() {

const initialCount:number = 12;
const [pokeList,setList] = useState<any>([]);
const [pokeMisc, setPokeMisc] = useState<any>([]);

const getPokemon = () => {
  // worked into onclick to get random pokemon
  fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=2000')
    .then(response=>response.json())
      .then(res=> {

        let i=0;
        do{

          i++;
          const pokeUrl = res.results[Math.floor(Math.random() * res.results.length)]; 
          setList((pokeList: any) => [...pokeList,pokeUrl] );

        } while ( i < initialCount)
      })
}

useEffect(()=>{

  pokeList.forEach((item:any)=>{
    fetch(item.url)
      .then( response => response.json())
      .then( res=>{
        let merged = {...item,...res}
        setPokeMisc((pokeMisc:any)=>([...pokeMisc,merged]))
      })

  })
}, [pokeList])

useEffect(()=>{  

})

return (
<>

  <AdvSearch/>
  
  <div className={pokeList.length === initialCount ? 'large-wrapper ': 'large-wrapper d-none'}>
    <div className="w-100 py-5 mt-md-5"></div>
    <div className="row p-4 text-left justify-content-center">
      <div className="col-md-6 text-center">
        <Button 
          buttonClass="randomize w-75 mb-4 mb-md-0"
          buttonLink="#"
          buttonText=" Suprise Me!"
        />
      </div>
      <div className="col-md-6 text-center">
        <select className="w-75 btn basic-filter" name="" id="">
          <option value="test">test</option>
        </select>
      </div>
      <div className="w-100 pt-5"></div>
      {
        pokeMisc.map((item:any)=>{
          console.log(item)
          return(
          
            <div className="col-lg-3 col-md-4 col-sm-6 updown text-md-left text-center" >


            <div className="wrap">
              <img src={item ? item.sprites.front_default : '#'} alt="" className={item ? 'd-inline' : 'd-none' } />
            </div>

            <p className="poke-number mb-0 mt-4 h5">{item ? item.id : 'Pokemon ID '}</p>
            <p className="h6 mb-3 text-capitalize">{item ? item.name : 'Pokemon Name'}</p>

            <div className="row p-0 mb-4 text-left justify-content-start ">

              {item.types.map((tp:any)=>{
                return(
                  <div className="col-md-6 px-1 " >
                    <p className={item ? `types btn mb-4 text-capitalize ${tp.type.name.toLowerCase()}` : "types btn mb-4 text-capitalize"}>{item ? tp.type.name : 'Pokemon Name'}</p>
                  </div>
                )
              })}
            </div>  
          </div>  
          )
        })
      }

    </div>
  </div>

  <div className={pokeList.length === initialCount ? "pokeball-container d-none" : "pokeball-container"} >
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
