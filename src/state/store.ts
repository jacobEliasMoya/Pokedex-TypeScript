import { configureStore } from "@reduxjs/toolkit";
import initalPokeReducer from "./initialPokemon/initialPokemonSlice";

export const store = configureStore({
    reducer:{
        intialPokemon: initalPokeReducer,
    }
})

// types for TS
export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;