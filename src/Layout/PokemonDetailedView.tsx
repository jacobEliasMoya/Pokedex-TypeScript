import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Rootstate } from "../state/store"
import { InitialPokeList } from "../state/initialPokemon/initialPokemonSlice";

export default function PokemonDetailedView() {

    interface NameUrl {
        name:string,
        url:string
    }
    interface StringObj {
        flavor_text:string | undefined,
        language:NameUrl | undefined,
        version:NameUrl | undefined
    }
    
    const currentSelection = useSelector((state:Rootstate)=>state.selectedPokemon) 
    const [speciesSpecifics,setSpeciesSpecifics] = useState<any>(); 

    const fetchSpeciesSpecs = async (e:InitialPokeList) =>{
        await fetch(e.species.url)
        .then(response=>response.json())
        .then( res=> {
            setSpeciesSpecifics(res)
        })
    }

    const returnEnglishSnippet = (stringArr:Array<StringObj>) => {

        let index:number = 0;

        do{
            
            let string:any = stringArr[index].flavor_text;
            let newString = string.replaceAll("\f","").replaceAll("\n", " ").replaceAll(".", ". ").replace(/POKéMON/g,"Pokemon");
            let isEng:boolean = /^[a-zA-Z0-9\s.,!?;:'"()-]+$/.test(newString);

            if(isEng){
                index++;
                return newString
            } else {
                index = 0;
                return `Non-English Desc: ${newString}.`
            }

        } while ( index < 1)
    }
 
    useEffect(()=>{
        console.log(currentSelection)
        fetchSpeciesSpecs(currentSelection)
    },[currentSelection])

  return (
    < >
        <div className="large-wrapper pt-5">
            <div className="row justify g-1 prev-next-evolution justify-content-center">
                <div className="col-md-6  text-center">
                    <button className="btn w-100 rounded-0">[ID] [PrevPokemonName] </button>
                    </div>
                <div className="col-md-6   text-center">
                    <button className="btn w-100 rounded-0">[ID] [Next PokemonName] </button>
                </div>
            </div>
            <div className="row justify px-5 py-4 selected-pokemon-outer justify-content-center">

                <div className="col-12 pt-4 pb-3 text-center px-4">
                    <h1 className="h2" >{currentSelection.name} <span className="inner">{`#${currentSelection.id}`}</span></h1>
                    {/* possible drop down for evolutionary forms? */}
                </div>

                <div className="col-md-6 text-center px-4">
                   <img className="pokemon-sprite" src={currentSelection.sprites.front_default}/> 
                </div>
                <div className="col-md-6 px-4">
                    {speciesSpecifics ? returnEnglishSnippet(speciesSpecifics.flavor_text_entries) : 'no'}
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
                                <h3>Abilities</h3>
                            </div>
                        </div>
                    </div>
               </div>
                <div className="col-md-6 px-4">
                    <div className="stats-box rounded row text-center mb-3 mb-md-0">
                        <h2 className="h5">Stats</h2>
                        <div className="col-md-2 hp px-1 col">
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <h3 className="">HP</h3>
                        </div>
                        <div className="col-md-2 attack px-1 col">
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <h3 className="">Attack</h3>

                        </div>
                        <div className="col-md-2 defense px-1 col">
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <h3 className="">Defense</h3>

                        </div>
                        <div className="col-md-2 spcak px-1 col">
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <h3 className="">Special Attack</h3>

                        </div>
                        <div className="col-md-2 spcdef px-1 col">
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <h3 className="">Special Defense</h3>

                        </div>
                        <div className="col-md-2 speed px-1 col">
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <h3 className="">Speed</h3>

                        </div>
                    </div>
                </div>
                <div className="col-md-6 text-left px-4">
                    <h3 className="">Type</h3>
                    <div className="row">
                        {currentSelection.types.map((tp:any)=>{
                            return(
                                <div className="col-md-4 px-1 " >
                                    <p className={currentSelection ? `types btn w-100 mb-2 mb-md-3 text-capitalize ${tp.type.name.toLowerCase()}` : "types btn mb-4 text-capitalize"}>{currentSelection ? tp.type.name : 'Pokemon Name'}</p>
                                </div>
                            )
                        })}
                    </div>
                    <h3 className="mt-3">Weakness</h3>
                    [weakness] [weakness] [weakness]

                </div>
                <div className="col-12 pt-5 pb-3 text-center">
                    [evoultions]
                </div>

            </div>
        </div>
    </ >
  )
}