import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { fetchAsyncMovieOrShowDetails, getAllMovieOrShow, removeSelectedMovieOrShow } from '../../features/movies/movieSlice';
import "./MovieDetail.scss"
const MovieDetail = () => {
  let {imdbID} = useParams();
  console.log(imdbID);
  
  const dispatch = useDispatch();
  const data = useSelector(getAllMovieOrShow)
  console.log(data);
  useEffect(() => {
    dispatch(fetchAsyncMovieOrShowDetails(imdbID));

    return () => {
      dispatch(removeSelectedMovieOrShow())
    }
  }, [dispatch, imdbID])
  
  return (
    <div className="movie-section">
      {Object.keys(data).length === 0 ? (<div>Loading</div>)
      :
      (
        <>
          <div className="section-left">
            <div className="movie-title">{data.Title}</div>
            <div className="movie-rating">
              <span>
                IMDB Rating {/** fa fa-star icon */}  : {data.imdbRating}
              </span>
              <span>
                IMDB Votes {/** fa fa-thumbs-up icon */} : {data.imdbVotes}
              </span>
              <span>
                Runtime {/** film icon */} : {data.Runtime}
              </span>
              <span>
                Year {/** calender icon */}  : {data.Year}
              </span>
            </div>

            <div className="movie-plot">
              {data.Plot}
            </div>
            <div className="movie-info">
              <div className="">
                <span>Director</span>
                <span>{data.Director}</span>
              </div>
              <div className="">
                <span>Stars</span>
                <span>{data.Actors}</span>
              </div>
              <div className="">
                <span>Generes</span>
                <span>{data.Genre}</span>
              </div>
              <div className="">
                <span>Language</span>
                <span>{data.Language}</span>
              </div>
              <div className="">
                <span>Awards</span>
                <span>{data.Awards}</span>
              </div>
            </div>
          </div>

          <div className="section-right">
            <img src={data.Poster} alt={data.Title} />
          </div>
        </>
      )}
    </div>
  )
}

export default MovieDetail