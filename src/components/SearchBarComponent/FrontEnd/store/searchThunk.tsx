import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export interface searchState {
  searchText: string;
  dropdownSearches: string[];
  selectedText: string | null;
}

export const fetchSearchResultsThunk = createAsyncThunk('search/fetchSearchResults',
  async (searchText: string) => { //searchText = bookName
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchText}&startIndex=0&maxResults=20`);
      return response.data.items.map((item: any) => item.volumeInfo.title);
    } catch(err) {
      throw new Error('Can not fetch books data');
    }
  }
)