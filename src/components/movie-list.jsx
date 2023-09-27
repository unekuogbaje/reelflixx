import React, { Fragment } from 'react'

const MovieList = (props) => {
  return (
    <Fragment>
      {props.movies.map( (movie, index) => (
        <div className="image-container d-flex justify-content-start m3">
          <img src={movie.Poster} alt='movie'/>
        </div>
      ) )}
    </Fragment>
  )
}

export default MovieList;