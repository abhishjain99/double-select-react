import { ThunkDispatch } from "@reduxjs/toolkit";
import { FunctionComponent, useState, KeyboardEvent, ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../FrontEnd/store/searchStore";
import { selectSearchText, setSearchText } from "./store/searchSlice";
import { fetchSearchResultsThunk } from "./store/searchThunk";
import './searchBar.css';

const SearchBar: FunctionComponent = () => {
  const { searchText, dropdownSearches } = useSelector( (state: RootState) => state.searchReducer );
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [searchIndex, setSearchIndex] = useState<number>(-1); // when user hovers over searches

  useEffect(() => {
    if(searchText) {
      dispatch(fetchSearchResultsThunk(searchText));
    }
  }, [searchText, dispatch])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchText(e.target.value));
  };

  const handleClick = (index: number) => {
    dispatch(selectSearchText(dropdownSearches[index]));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setSearchIndex((prev) => (prev + 1) % dropdownSearches.length);
    } else if (e.key === "ArrowUp") {
      setSearchIndex(
        (prev) => (prev - 1 + dropdownSearches.length) % dropdownSearches.length
      ); // to take care of non-negative numbers
    } else if (e.key === "Enter" && searchIndex >= 0) {
      dispatch(selectSearchText(dropdownSearches[searchIndex]));
    }
  };

  return (
    <div className="searchbar">
      <input
        type="text"
        value={searchText}
        placeholder="Book"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {dropdownSearches.length > 0 && (
        <ul className="dropdown">
          {dropdownSearches.map((searchedText, index) => (
            <li
              key={index}
              className={searchIndex === index ? "hovered" : ""}
              onMouseEnter={() => setSearchIndex(index)}
              onClick={() => handleClick(index)}
            >
              {searchedText}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;