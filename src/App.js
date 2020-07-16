import React, { useState, useEffect, useReducer } from 'react';
import './App.css';
import Header from './components/Header';
import Search from './components/Serach';
import Movie from './components/Movie';

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b"; // you should replace this with yours

const initState = {
  loading: false,
  movies: [],
  error: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        error: null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        erorr: action.error
      };
    default:
      return state;

  }

}

const App = () => {

  const [state,dispatch] = useReducer(reducer,initState);


  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse=>{
        dispatch(
          {
            type:"SEARCH_MOVIES_SUCCESS",
            payload:jsonResponse.Search
          }
        )
      })
  }, []);


  const search = searchValue => {
    dispatch({
      type :"SEARCH_MOVIES_REQUEST",
    });

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
    .then(response => response.json())
    .then(jsonResponse => {
      if (jsonResponse.Response === "True") {
        dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.Search
        });
      } else {
        dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.Error
        });
      }
    });
};

const { movies, error, loading } = state;

  return (
    <div className="App">
      <Header title={"HOOKED"} />
      <Search search={search}></Search>
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !error ? (<span>loading...</span>) : error ? (<div className="errorMessage">{error}</div>) : (movies.map((movie, index) => (
          <Movie key={index} movie={movie} />
        )))}
      </div>
    </div>
  )
}

export default App;
