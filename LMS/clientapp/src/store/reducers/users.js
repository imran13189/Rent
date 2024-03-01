// types
import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

// initial state
const initialState = {
    userDetails: null,
    showLocation:false,
    search: '',
    selectedLocation:''
};



// ==============================|| SLICE - Accounts ||============================== //

const users = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUserDetails(state, action) {
            
            if (action.payload.userDetails)
                state.userDetails = action.payload.userDetails;
            else
                state.userDetails = null;
            
        }
    }
});

export default users.reducer;

export const { setUserDetails} = users.actions;
