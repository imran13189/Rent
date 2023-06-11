// types
import { createSlice } from "@reduxjs/toolkit";


// initial state
const initialState = {
    positionDetails: {
        lat: 30.2938312,
        lng: 78.06298795850616,
    },
    search: ''
};



// ==============================|| SLICE - Accounts ||============================== //

const property = createSlice({
    name: "property",
    initialState,
    reducers: {
        setSelectedPosition(state, action) {
            debugger;
            state.positionDetails = action.payload.positionDetails;
        },
        
        setSearch(state, action) {
            return { ...state, search: action.payload.search };
        },
    }
   
});

export default property.reducer;

export const { setSelectedPosition, setSearch } = property.actions;
