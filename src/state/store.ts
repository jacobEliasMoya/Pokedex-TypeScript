import { configureStore } from "@reduxjs/toolkit";
import initalPokeReducer from "./initialPokemon/initialPokemonSlice";
import initialAppStateReducer from "./mainAppState/appInitializationSlice";
import specificPokeReducer from "./selectedPokemon/selectedPokemonSlice"


export const store = configureStore({
    reducer:{
        intialPokemon: initalPokeReducer,
        initialAppState: initialAppStateReducer,
        selectedPokemon: specificPokeReducer

    }
})

// types for TS
export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;