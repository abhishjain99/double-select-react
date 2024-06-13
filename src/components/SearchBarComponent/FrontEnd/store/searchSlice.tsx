import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchSearchResultsThunk, searchState } from "./searchThunk";


const initialState = {
  searchText: "",
  dropdownSearches: [],
  selectedText: null
} as searchState;

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchText(state, action: PayloadAction<string>) {
      state.searchText = action.payload
    },
    selectSearchText(state, action: PayloadAction<string>) {
      state.selectedText = action.payload;
      state.searchText = action.payload;
      state.dropdownSearches = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearchResultsThunk.fulfilled, (state, action: PayloadAction<string[]>) => {
      state.dropdownSearches = action.payload;
    });
  }
})

export const { setSearchText, selectSearchText } = searchSlice.actions;
export default searchSlice.reducer;