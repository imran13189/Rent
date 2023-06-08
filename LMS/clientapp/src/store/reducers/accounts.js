// types
import { createSlice ,createAsyncThunk } from '@reduxjs/toolkit';
import AccountService from './../../services/AccountService';


// initial state
const initialState = {
    accountDetails:{},
    accountsData:[],
    accountContactData:[]
};

export const fetchAccountPosts = createAsyncThunk('accountsData/fetchAccountPosts', async (userId) => {
  
    const response = await AccountService.GetAccounts(userId);    
    return response;
  });

  export const fetchAccountContact = createAsyncThunk('accountsData/fetchAccountContact', async () => {
  
    const response = await AccountService.GetContactAccount();    
    return response;
  });
// ==============================|| SLICE - Accounts ||============================== //

const accounts = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        setSelectedAccount(state, action) {
       
            state.accountDetails = action.payload.accountDetails;
        },
       
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchAccountPosts.fulfilled, (state, action) => {
          // Add user to the state array
        
          return {...state,accountsData:action.payload};
        })
        builder.addCase(fetchAccountContact.fulfilled, (state, action) => {
          // Add user to the state array
          return {...state,accountContactData:action.payload};
        })
      }
});

export default accounts.reducer;

export const { setSelectedAccount} = accounts.actions;
