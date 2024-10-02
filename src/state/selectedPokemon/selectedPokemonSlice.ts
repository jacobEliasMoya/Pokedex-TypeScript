import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialPokeList } from "../initialPokemon/initialPokemonSlice"

const initialState:InitialPokeList = ({
    abilities:[],
    base_experience:0,
    cries: {
        latest: "",
        legacy: ""
    },
    forms:[],
    game_indeces: [],
    height : 0,
    held_items: [],
    id: 0,
    is_default: false,
    location_area_encounters: '',
    moves: [],
    name: '',
    order: 0,
    past_abilities: [],
    past_types: [],
    species: {
        name:'',
        url:''
    },
    sprites:'',
    stats: [],
    types:[],
    url: '',
    weight: 0
})

const selectedPokemonSlice = createSlice({
    name: 'selectedPokemon',
    initialState,
    reducers: {
        selectPokemon : (state,action:PayloadAction<InitialPokeList>) =>{
            return {...state, ...action.payload}
        }
    }
})

export const {selectPokemon} = selectedPokemonSlice.actions;
export default selectedPokemonSlice.reducer;