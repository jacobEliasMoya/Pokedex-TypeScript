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

            index++;

            if(isEng){
                console.log(newString)
                return newString
            } else {
                index = 0;
                console.log(newString)
                return `Non-English Desc: ${newString}.`
            }

        } while ( index < 1)
    }
 
    useEffect(()=>{
        
    },[speciesSpecifics])

    useEffect(()=>{
        fetchSpeciesSpecs(currentSelection)
    },[currentSelection])

  return (
    < >
        <div className="large-wrapper">
            <div className="row">
                <div className="col-md-6">
                    [ID] [PrevPokemonName] 
                    </div>
                <div className="col-md-6">
                    [ID] [NextPokemonName]
                </div>

                <div className="col-12">
                    {currentSelection.name} {currentSelection.id}
                    {/* possible drop down for evolutionary forms? */}
                </div>

                <div className="col-md-6">
                   <img src={currentSelection.sprites.front_default}/> 
                </div>
                <div className="col-md-6">
                    {speciesSpecifics ? returnEnglishSnippet(speciesSpecifics.flavor_text_entries) : 'no'}
                    [Versions:]
                    [box of height,category,weight,abilities,gender]
                </div>
                <div className="col-md-6">
                    [statsbox hp,attack,defense,spcak,spcdef,speed]
                </div>
                <div className="col-md-6">
                    [types]
                    [weakness]
                </div>
                <div className="col-12">
                    [evoultions]
                </div>

            </div>
        </div>
    </ >
  )
}