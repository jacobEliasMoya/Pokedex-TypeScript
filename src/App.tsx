import { useEffect,useState } from "react"
import AdvSearch from "./Layout/AdvSearch";
import Button from "./Components/Button";
import { useSelector } from "react-redux";
import { Rootstate } from "./state/store";
import { useDispatch } from "react-redux";
import { triggerApp } from "./state/mainAppState/appInitializationSlice";
import { setIntialList,resetList,setReversList  } from "./state/initialPokemon/initialPokemonSlice";
// placeholder image when sprites not present
import missingMon from "./assets/missingmon.png"; 

function App() {

const [isRandom,setIsRandom] = useState<boolean>(false);
const [initialCount,setIntialCount] = useState(0);

// appinialized state
const isAppInialized = useSelector((state:Rootstate)=>state.initialAppState); 
// pokelist state
const pokemonList = useSelector((state:Rootstate)=>state.intialPokemon);
const dispatch = useDispatch();

const viewMorePokemon = () =>{
  isRandom ? getRandomPokemon() : getPokemon();
}

const handleSearchFilter = (e:any) =>{
  switch (e.target.value) {

    case 'lowest-first':
      pokemonList.map((item:any)=>{
        dispatch(setIntialList(item))
      })
      break;
    case 'highest-number':
      pokemonList.map((item:any)=>{
      dispatch(setReversList(item))
    })
      break;

    case 'a-z':
    console.log('bam3')
      break;

    default:
      console.log('bam4')
        break;
  }
}

// get all pokemon pushed into state, then only displays set amt based on component state
const getPokemon = async () => {
  // worked into onclick to get pokemon

  await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${initialCount}&limit=${initialCount + 12}`)
  .then(response=>response.json())
  .then(async res=> {
    let i = 0;
    do{
      await fetch(res.results[i].url)
      .then(results=>results.json())
      .then(res=>{
        dispatch(setIntialList(res));
      })
      i++;
    } while(i < 12)
      
    })

  setIntialCount(prev=>prev + 12);

}

const getRandomPokemon = () => {
  dispatch(resetList());
  setIsRandom(true);

  // worked into onclick to get pokemon
  fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10000')
    .then(response=>response.json())
      .then(res=> {
        let i=0;
        do{
          fetch(res.results[Math.floor(Math.random() * res.results.length)].url)
          .then(response=>response.json())
          .then(res=>{
            dispatch(setIntialList(res));
          })
          i++;
        } while (i < initialCount)
      })
}

useEffect(()=>{
  isAppInialized.value ? getPokemon() : null; 
},[ isAppInialized ])


useEffect(()=>{
  console.log(initialCount)
},[ initialCount ])

return (
<>
  <AdvSearch/>
  
  <div className={isAppInialized.value ? 'large-wrapper ': 'large-wrapper d-none'}>
    <div className="w-100 py-5 mt-md-5"></div>
    <div className="row p-4 text-left justify-content-center">
      <div className="col-md-6 col-lg-4 text-center">

        {/* should enable functions re this button as a passable onclick */}  
        <Button 
          buttonClass="randomize w-100 mb-4 mb-md-0"
          buttonText="Suprise Me!"
          buttonIcon="fa fa-refresh"
          morePokemon={getRandomPokemon}
        />
      </div>

      <div className="col-md-6 col-lg-4  text-center">
        <select onChange={handleSearchFilter} className="w-100 btn basic-filter" name="" id="">
          <option value="lowest-first">Lowest Number (First)</option>
          <option value="highest-number">Highest Number (First)</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
        </select>
      </div>
      <div className="w-100 pt-5"></div>

      { 
        pokemonList.map((item:any)=>{
          return(
          
            <div className="col-sm-6 col-lg-3 col-md-4  updown text-md-left text-center" >

            <div className="wrap">
              <img src={item ? item.sprites.front_default : missingMon} alt="" className={item ? 'd-inline' : '' } />
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
          morePokemon={viewMorePokemon}
          buttonClass="randomize  mb-4 mb-md-0"
          buttonText="View More Pokemon"
          buttonIcon={undefined}
        />
      </div>
    </div>
  </div>

  <div className={isAppInialized.value ? "pokeball-container d-none" : "pokeball-container"} >
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