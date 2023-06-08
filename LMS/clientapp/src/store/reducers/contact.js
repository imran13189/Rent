// types
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ContactService from "./../../services/ContactService";

const getContactsData = () => {
  return ContactService.GetContacts();
};
// initial state
const initialState = {
  openItem: ["dashboard"],
  openComponent: "buttons",
  contactDetails: { contactId: 0, firstName: "", lastName: "" },
  contactsData: [],
  statusData: [],
};

export const fetchPosts = createAsyncThunk(
  "contactsData/fetchPosts",
  async (userId) => {
    const response = await ContactService.GetContacts(userId);
    return response;
  }
);

export const fetchStatus = createAsyncThunk(
  "statusData/fetchStatus",
  async () => {
    const response = await ContactService.GetStatus();
    return response;
  }
);

// ==============================|| SLICE - MENU ||============================== //

const contact = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setSelectedContact(state, action) {
      //state.contactDetails =action.payload.contactDetails;
      return { ...state, contactDetails: action.payload.contactDetails };
    },

    setContactData(state, action) {
      const data = fetchPosts();
      state.contactsData = { ...state, contactsData: data };
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      // Add user to the state array
      if (action.payload != "" && action.payload != null)
        return { ...state, contactsData: action.payload };
      else return { ...state, contactsData: [] };
    });
    builder.addCase(fetchStatus.fulfilled, (state, action) => {
      // Add user to the state array
      if (action.payload != "" && action.payload != null)
        return { ...state, statusData: action.payload };
      else return { ...state, statusData: [] };
    });
  },
});

export default contact.reducer;

export const { setSelectedContact, setContactData } = contact.actions;
