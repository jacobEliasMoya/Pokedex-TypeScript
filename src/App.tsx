import { useEffect,useState } from "react"
import AdvSearch from "./Layout/AdvSearch";
import Button from "./Components/Button";
import { useSelector } from "react-redux";
import { Rootstate } from "./state/store";
import { useDispatch } from "react-redux";
import { triggerApp } from "./state/mainAppState/appInitializationSlice";

function App() {

// const listMain = useSelector((state:Rootstate)=>state.intialPokemon);
const initialCount:number = 12;
const [pokeList,setList] = useState<any>([]);
const [pokeMisc, setPokeMisc] = useState<any>([]);

const isAppInialized = useSelector((state:Rootstate)=>state.initialAppState);
const dispatch = useDispatch();

const addMorePokemon = () =>{
  setList([])
  getPokemon();
}

const newList = () =>{
  setList([])
  setPokeMisc([])
  getPokemon();
}

const getPokemon = () => {
  // worked into onclick to get random pokemon
  fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=2000')
    .then(response=>response.json())
      .then(res=> {
        let i=0;
        do{
          console.log(res);
          const pokeUrl = res.results[Math.floor(Math.random() * res.results.length)]; 
          setList((pokeList: any) => [...pokeList,pokeUrl] );
          i++;

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
  isAppInialized.value ? getPokemon() : null; 
},[isAppInialized])

return (
<>
  <AdvSearch/>
  
  <div className={pokeList.length === initialCount ? 'large-wrapper ': 'large-wrapper d-none'}>
    <div className="w-100 py-5 mt-md-5"></div>
    <div className="row p-4 text-left justify-content-center">
      <div className="col-md-6 col-lg-4 text-center">

        {/* should enable functions re this button as a passable onclick */}  
        <Button 
          buttonClass="randomize w-100 mb-4 mb-md-0"
          buttonText="Suprise Me!"
          buttonIcon="fa fa-refresh"
          morePokemon={newList}
        />
      </div>

      <div className="col-md-6 col-lg-4  text-center">
        <select className="w-100 btn basic-filter" name="" id="">
          <option value="test">test</option>
        </select>
      </div>
      <div className="w-100 pt-5"></div>
      { 
        pokeMisc.map((item:any)=>{
          return(
          
            <div className="col-sm-6 col-lg-3 col-md-4  updown text-md-left text-center" >


            <div className="wrap">
              <img src={item ? item.sprites.front_default : '#'} alt="" className={item ? 'd-inline' : ' ' } />
            </div>

            <p className="poke-number mb-0 mt-4 h5">{item ? `#${item.id}` : 'Pokemon ID '}</p>
            <p className="h6 mb-3 text-capitalize">{item ? item.name : 'Pokemon Name'}</p>

            <div className="row p-0 mb-4 text-left justify-content-start ">

              {item.types.map((tp:any)=>{
                return(
                  <div className="col-md-6 px-1 " >
                    <p className={item ? `types btn mb-2 mb-md-3 text-capitalize ${tp.type.name.toLowerCase()}` : "types btn mb-4 text-capitalize"}>{item ? tp.type.name : 'Pokemon Name'}</p>
                  </div>
                )
              })}
            </div>  
          </div>  
          )
        })
      }

      <div className="col-12 text-center mt-4 px-1 " >
        <Button 
          morePokemon={addMorePokemon}
          buttonClass="randomize  mb-4 mb-md-0"
          buttonText="View More Pokemon"
          buttonIcon={undefined}
        />
      </div>
    </div>
  </div>

  <div className={pokeList.length === initialCount ? "pokeball-container d-none" : "pokeball-container"} >
        <div className="pokeball-inner">
          <div className="pokeball-top">
            <div className="pokeball-button" onClick={()=>{
              dispatch(triggerApp())
            }}>
            </div>
          </div>
          <div className="pokeball-bottom"></div>
      </div>
  </div>    

</>
)
}

export default App