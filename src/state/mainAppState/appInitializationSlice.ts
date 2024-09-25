import { createSlice } from "@reduxjs/toolkit";

interface InitializationState{
    value: boolean
}

const initialState: InitializationState = {
    value:false
}

const initialAppStateSlice = createSlice({
    name: 'isAppOn',
    initialState,
    reducers:{
        triggerApp: (state) =>{
            state.value = !state.value;
        }
    }
})

export const {triggerApp} = initialAppStateSlice.actions;
export default initialAppStateSlice.reducer;