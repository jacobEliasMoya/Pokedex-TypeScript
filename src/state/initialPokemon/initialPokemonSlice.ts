import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NameUrlType {
    name:string,
    url:string
}

interface AbilitiesArrObjType{
    ability: NameUrlType,
    is_hidden: boolean,
    slot: number
}

interface CriesObjType{
    latest: string,
    legacy: string
}

interface GameIndecesType{
    game_index:number,
    version: NameUrlType

}

interface MovesType{
    move: Array<NameUrlType>,
}

interface InitialPokeList {
    abilities: Array<AbilitiesArrObjType>,
    base_experience: number,
    cries: CriesObjType,
    forms: Array<NameUrlType>,
    game_indeces: Array<GameIndecesType>,
    height:number,
    held_items: Array<any>,
    id:number,
    is_default:boolean,
    location_area_encounters: string,
    // fix tomorrow/ fill in full type
    moves:Array<MovesType>,
    name:string,
    order:number,
    // fix tomorrow/ fill in full type/ proper typing
    past_abilities:Array<any>,
    past_types:Array<any>,
    species:NameUrlType,
    sprites: any,
    stats:Array<any>,
    types:Array<any>,
    url:string,
    weight: number
}

const initialState:InitialPokeList|any = {}

const intialPokeSlice = createSlice({
    name: "pokemon",
    initialState,
    reducers:{
        setIntialList : (state, action:PayloadAction<InitialPokeList>) =>{
            state = {...state,...action.payload}
        }
    }

})

export const {setIntialList} = intialPokeSlice.actions;
export default intialPokeSlice.reducer;