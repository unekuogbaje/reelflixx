import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieList from './components/movie-list';
import MovieListHeading from './components/movie-list-heading';
import SearchBox from './components/search-box';
import AddToFavourites from './components/add-to-favourites';
import RemoveFromFavourites from './components/remove-from-favourites';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
	const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState([]);

	const getMovieRequest = async (searchValue) => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=5d1ed315`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

  useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

  return (
    <div className="container-fluid reel-flixx-app ">
      <div className="row d-flex mt-4 mb-4 align-items-center">
        <MovieListHeading heading="Movies"/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
      <div className="row">
        <MovieList 
          movies={movies}
          handleFavouritesClick={addFavouriteMovie}
					favouriteComponent={AddToFavourites}
        />
      </div>

      <div className="row align-items-center d-flex mt-4 mb-4">
        <MovieListHeading heading="Favourites"/>
      </div>
      <div className="row">
        <MovieList
          movies={favourites}
          handleFavouritesClick={removeFavouriteMovie}
					favouriteComponent={RemoveFromFavourites}
        />
      </div>
    </div>
  );
}

export default App;
