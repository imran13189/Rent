// types
import { createSlice ,createAsyncThunk } from '@reduxjs/toolkit';
import UserService from './../../services/UserService';


// initial state
const initialState = {
    userDetails:{},
    usersData:[],
};

export const fetchUsersPosts = createAsyncThunk('usersData/fetchUsersPosts', async () => {
  
    const response = await UserService.GetUsers();    
    return response;
  });

// ==============================|| SLICE - Accounts ||============================== //

const users = createSlice({
    name: 'users',
    initialState,
    reducers: {
      setSelectedUser(state, action) {
       
            state.userDetails = action.payload.userDetails;
        },
       
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchUsersPosts.fulfilled, (state, action) => {
          // Add user to the state array
          return {...state,usersData:action.payload};
        })
      },
});

export default users.reducer;

export const { setSelectedUser} = users.actions;
