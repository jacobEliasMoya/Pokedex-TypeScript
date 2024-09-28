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

export interface InitialPokeList {
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
    moves:Array<MovesType>,
    name:string,
    order:number,
    past_abilities:Array<any>,
    past_types:Array<any>,
    species:NameUrlType,
    sprites: any,
    stats:Array<any>,
    types:Array<any>,
    url:string,
    weight: number
}

const initialState:Array<InitialPokeList> = [];

const intialPokeSlice = createSlice({
    name: "pokemonList",
    initialState,
    reducers:{
        setIntialList : (state, action:PayloadAction<InitialPokeList>) =>{
            return [...state, action.payload];
        },
        setReversList : (state, action:PayloadAction<InitialPokeList>) =>{
            return [action.payload, ...state];
        },
        orderHightoLow : (state, action:PayloadAction<Array<InitialPokeList>>) =>{
            return [...action.payload, ...state].sort((a:InitialPokeList,b:InitialPokeList) =>b.id  -a.id);
        },
        orderLowToHigh : (state, action:PayloadAction<Array<InitialPokeList>>) =>{
            return [...action.payload, ...state].sort((a:InitialPokeList,b:InitialPokeList) =>b.id  -a.id);
        },
        orderAlphaAz : (state, action:PayloadAction<Array<InitialPokeList>>) =>{
            return [...action.payload, ...state].sort((a,b)=>a.name.localeCompare(b.name));
        },
        orderAlphaZa : (state, action:PayloadAction<Array<InitialPokeList>>) =>{
            return [...action.payload, ...state].sort((a,b)=>b.name.localeCompare(a.name));
        },
        resetList : ()=>{
            return initialState; 
        }
    }
})

export const {setIntialList,resetList,setReversList,orderHightoLow,orderLowToHigh,orderAlphaAz,orderAlphaZa} = intialPokeSlice.actions;
export default intialPokeSlice.reducer;