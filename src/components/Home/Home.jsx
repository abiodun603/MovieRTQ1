import React, { useEffect } from 'react'
import MovieListing from '../MovieListing/MovieListing'
import movieApi from "../../common/apis/MovieApi"
import {APIKey} from "../../common/apis/MovieApiKey"
import { useDispatch } from 'react-redux'
import { addMovies, fetchAsyncMovies, fetchAsyncShows } from '../../features/movies/movieSlice'
const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncMovies());
    dispatch(fetchAsyncShows())
  }, [dispatch])
  
  return (
    <>
      <div className="banner-img">

      </div>

      <MovieListing/>
    </>
  )
}

export default Home