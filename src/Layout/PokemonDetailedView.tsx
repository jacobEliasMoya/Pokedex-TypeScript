import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Rootstate } from "../state/store"
import { InitialPokeList } from "../state/initialPokemon/initialPokemonSlice";
import { selectPokemon } from "../state/selectedPokemon/selectedPokemonSlice";

export default function PokemonDetailedView() {

    interface NameUrl {
        name:string,
        url:string
    }

    interface NameID {
        name:string,
        url:string
    }
    
    const currentSelection = useSelector((state:Rootstate)=>state.selectedPokemon) 
    const [speciesSpecifics,setSpeciesSpecifics] = useState<any>(); 
    const [evolutionChain,setEvolutionChain] = useState<any>(); 
    const [prevnextPokemonName,setPrevnextPokemonName] = useState<any>(); 
    const[prevPokemon,setPrevPokemon] = useState<NameID>();
    const[nextPokemon,setNextPokemon] = useState<NameID>();
    const[pokeWeaknesses,setPokeWeakness] = useState<string[]>([]);

    const dispatch = useDispatch();

    const setWeaknesses = (type:string) =>{

        switch (type) {
            case 'grass':
                return ["rock","fire","flying"]
            break;
            case 'bug':
                return ["rock","fire","flying"]
            break;
            case 'poison':
                return ["ground","psychic"]
            break;
            case 'fire':
                return ["ground","water","rock"]
            break;
            case 'flying':
                return ["electric","ice","rock"]
            break;
            case 'water':
                return ["electric","grass"]
            break;
            case 'normal':
                return ["fighting"]
            break;
            case 'electric':
                return ["ground"]
            break;
            case 'ground':
                return ["water","ice","grass"]
            break;
            case 'fairy':
                return ["poison","steel"]
            break;
            case 'fighting':
                return ["fairy","flying","psychic"]
            break;
            case 'psychic':
                return ["bug","dark","ghost"]
            break;
            case 'rock':
                return ["fighting","grass","ground","steel","water"]
            break;
            case 'steel':
                return ["fire","fighting","ground"]
            break;
            case 'ice':
                return ["fire","fighting","rock"]
            break;
            case 'ghost':
                return ["dark","ghost"]
            break;
            case 'dark':
                return ["fairy","fighting","bug"]
            break;
            default:
                break;
        }
    }

    const fetchSpeciesSpecs = async (e:InitialPokeList) =>{
        await fetch(e.species.url)
            .then(response=>response.json())
                .then( res=> {
                    setSpeciesSpecifics(res)
                })
    }

    const getPokemon = async () => {
        // worked into onclick to get pokemon
          await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10000`)
            .then(response=>response.json())
              .then(async res=> {
                setPrevnextPokemonName(res.results)
              })
        }

    

    const getEvolutionChain = async () =>{
        await fetch(`https://pokeapi.co/api/v2/evolution-chain/${currentSelection.id}/`)
          .then(response=>response.json())
            .then( res=> {

                setEvolutionChain(res)
            })
    }

    const selectPrevPokemon = async () =>{

        await fetch(`${currentSelection.id === 1 ? prevPokemon?.url : `https://pokeapi.co/api/v2/pokemon/${currentSelection.id - 1}` }/`)
          .then(response=>response.json())
            .then( res=> {
                dispatch(selectPokemon(res))
            })
    }

    const selectNextPokemon = async () =>{
        await fetch(`https://pokeapi.co/api/v2/pokemon/${currentSelection.id + 1}/`)
          .then(response=>response.json())
            .then( res=> {
                dispatch(selectPokemon(res))
            })
    }

    const initiatePokeWeakness = () =>{
        let tempArr:string[] = [];
        
        currentSelection.types.map(item=>{
            let x:any = setWeaknesses(item.type.name);
            tempArr = [...tempArr,...x]
            setPokeWeakness([ ...pokeWeaknesses, ...tempArr])
        })

    }
    useEffect(()=>{
        // console.log(currentSelection)
        initiatePokeWeakness();
        fetchSpeciesSpecs(currentSelection);
        
     },[currentSelection])

    useEffect(()=>{
        // console.log(pokeWeaknesses)
    },[pokeWeaknesses])
    
    useEffect(()=>{
        if(prevnextPokemonName){ 
            prevnextPokemonName.filter((i:NameUrl)=>{
                if(i.name === currentSelection.name){
                    setPrevPokemon(prevnextPokemonName[prevnextPokemonName.indexOf(i)  === 0 ? prevnextPokemonName.length - 1 : prevnextPokemonName.indexOf(i) - 1])
                    setNextPokemon(prevnextPokemonName[prevnextPokemonName.indexOf(i) + 1])
                }
            })
        }
    },[[prevnextPokemonName]])

    useEffect(()=>{
        getPokemon();
        getEvolutionChain();
    },[])

    useEffect(()=>{
        console.log(speciesSpecifics)
     },[speciesSpecifics])
  return (
    < >
        <div className="large-wrapper pt-md-5">
            <div className="row justify g-1 prev-next-evolution justify-content-center">
                <div onClick={selectPrevPokemon} className="col-6  text-center">
                    <button  className="btn w-100 prevnext rounded-0"><span className="inner-id">#{currentSelection.id - 1}</span> {prevPokemon?.name} </button>
                    </div>
                <div className="col-6   text-center">
                    <button onClick={selectNextPokemon} className="btn w-100 prevnext rounded-0"><span className="inner-id">#{currentSelection.id + 1}</span>  {nextPokemon?.name}  </button>
                </div>
            </div>
            <div   className="row justify px-5 py-4 selected-pokemon-outer justify-content-center">

                <div className="col-12 pt-4 pb-3 text-center px-4">
                    <h1 className="h2" >{currentSelection.name} <span className="inner">{`#${currentSelection.id}`}</span></h1>
                    {/* possible drop down for evolutionary forms? */}
                </div>

                <div className="col-md-6 text-center px-4">
                   <img className="pokemon-sprite" src={currentSelection.sprites.front_default}/> 
                </div>
                <div className="col-md-6 px-4">
                    {speciesSpecifics ? speciesSpecifics.flavor_text_entries.map((text:any)=>{
                         return(
                            text.language.name === 'en' ? <p className='poke-desc'> {text.flavor_text.replaceAll("\f","").replaceAll("\n", " ").replaceAll(".", ". ")} </p>
                            : null
                        )
                    }) : 'no'}
                    <h3 className="pb-2 pt-3">Versions:</h3>
                    <div className="pokeSpecs-box rounded row text-left mb-3">
                        <div className="row">
                            <div className="col-md-6 p-0">
                                <h3>Height</h3>
                                {(currentSelection.height / 3).toFixed(2).replace(".","' ")}"
                                <h3>Weight</h3>
                                {(currentSelection.weight / 4.539).toFixed(1)} lbs
                                <h3>Gender</h3>

                            </div>
                            <div className="col-md-6 p-0">
                                <h3>Cetegory</h3>
                                {speciesSpecifics ? speciesSpecifics.genera.map((item:any)=>{
                                    if(item.language.name==='en'){
                                        return(<p>{item.genus}</p>)
                                    }
                                }) : ''} 
                                <h3>Abilities</h3>
                                {
                                    currentSelection ? currentSelection.abilities.map((ability:any)=>{
                                        return(
                                            ability.is_hidden ? null : <p>{ability.ability.name}</p>
                                        )
                                    }) : null
                                }
                            </div>
                        </div>
                    </div>
               </div>
                <div className="col-md-6 px-4">
                    <div className="stats-box rounded row text-center mb-3 mb-md-0">
                        <h2 className="h5">Stats</h2>
                        {
                            currentSelection ? currentSelection.stats.map(item=>{
                                return(
                                    <div className="col-md-2 hp px-1 col">
                                    <div className="bar active"></div>
                                    { item.base_stat }
                                    <h3 className="">{item.stat.name}</h3>
                                    </div>                                
                                )
                            }) : null
                        }
                       

                    </div>
                </div>
                <div className="col-md-6 text-left px-4">
                    <h3 className="">Type</h3>
                    <div className="row">
                        {currentSelection.types.map((tp:any)=>{
                            return(
                                <div className="col-md-4 col-6 px-1 " >
                                    <p className={currentSelection ? `types btn w-100 mb-2 mb-md-3 text-capitalize ${tp.type.name.toLowerCase()}` : "types btn mb-4 text-capitalize"}>{currentSelection ? tp.type.name : 'Pokemon Name'}</p>
                                </div>
                            )
                        })}
                    </div>
                    <h3 className="mt-3">Weakness</h3>
                    <div className="row">
                    {
                        pokeWeaknesses ? pokeWeaknesses.map(item=>{
                                    return(
                                        <>
                                         <div className="col-md-4 col-6 px-1 " >
                                            <p className={item ? `types btn w-100 mb-2 mb-md-3 text-capitalize ${item.toLowerCase()}` : "types btn mb-4 text-capitalize"}>{currentSelection ? item : 'Pokemon Name'}</p>
                                        </div>
                                        </>
                                    )
                                }) : null
                    }
                </div>
                </div>
                <div className="col-12 pt-5 pb-3 text-center">
                    {evolutionChain ? '' : ''}
                </div>

            </div>
        </div>
    </ >
  )
}