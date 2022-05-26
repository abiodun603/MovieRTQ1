import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MovieApi from "../../common/apis/MovieApi";
import { APIKey } from "../../common/apis/MovieApiKey";

export const fetchAsyncMovies = createAsyncThunk("movies/fetchAsyncMovies",
 async() => {
  const movieText = "Friends";
  const response = await MovieApi.get(
    `?apiKey=${APIKey}&s=${movieText}&type=movie`
  );
  console.log(response.data)
  return response.data;
});

export const fetchAsyncShows = createAsyncThunk("movies/fetchAsyncShows", 
  async() => {
    const series = "Harry";
    const response = await MovieApi.get(
      `?apiKey=${APIKey}&s=${series}&type=series`
    );
    return response.data
  })

export const fetchAsyncMovieOrShowDetails = createAsyncThunk("movies/fetchAsyncMovieOrShowDetail", 
  async(id) => {
    const response = await MovieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`);
    return response.data;
  } 
);



const initialState = {
  movies: {},
  shows: {},
  selecteMovieOrShow: {}
}

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovies: (state, {payload}) =>{
      state.movies = payload
    },
    removeSelectedMovieOrShow : (state) => {
      state.selecteMovieOrShow = {};
    }
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: () => {
      console.log("pending");
    },

    [fetchAsyncMovies.fulfilled]: (state, {payload}) => {
      console.log("Fetched Sucessfully");
      return {...state, movies: payload}
    },

    [fetchAsyncMovies.rejected]: () => {
      console.log("rejected")
    },

    [fetchAsyncShows.fulfilled]: (state, {payload})=> {
      return {...state, shows: payload}
    },
    [fetchAsyncMovieOrShowDetails.fulfilled]: (state, {payload}) => {
      return {...state, selecteMovieOrShow: payload}
    }
  }
})

export const {addMovies, removeSelectedMovieOrShow} = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies
export const getAllShows = (state) => state.movies.shows
export const getAllMovieOrShow = (state) => state.movies.selecteMovieOrShow;
export default movieSlice.reducer;