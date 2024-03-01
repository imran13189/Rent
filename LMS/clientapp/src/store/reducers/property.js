// types
import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import PropertyService from './../../services/PropertyService';

// initial state
const initialState = {
    positionDetails: {
        lat: 30.2938312,
        lng: 78.06298795850616,
        locationName:""
    },
    showLocation:false,
    search: '',
    selectedLocation: {page:1},
    params: {},
    properties:[]
};

export const fetchProperties = createAsyncThunk('propertiesData/fetchProperties', async (params) => {
    const response = await PropertyService.getProperties(params);
    return response;
});



// ==============================|| SLICE - Accounts ||============================== //

const property = createSlice({
    name: "property",
    initialState,
    reducers: {
        setSelectedPosition(state, action) {
          
            if (action.payload.positionDetails)
                state.positionDetails = action.payload.positionDetails;

            state.showLocation = action.payload.showLocation;
        },
        
        setSearch(state, action) {
            return { ...state, search: action.payload.search };
        },
        locationSearch(state, action) {
           
            state.selectedLocation = { ...state.selectedLocation, ...action.payload };

            /*return { ...state, {...payload.selectedLocation, ...action.payload } }*/
        },
        setParams(state, action) {
            state.params = action.payload;
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchProperties.fulfilled, (state, action) => {
            // Add user to the state array
            debugger;
            return { ...state, properties: [...state.properties, ...action.payload] };
           // return { ...state, {properties: action.payload };
        })
        
    }
   
});

export default property.reducer;

export const { setSelectedPosition, setSearch, locationSearch } = property.actions;
