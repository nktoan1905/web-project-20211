import { createContext, useReducer} from 'react'
import { filmReducer } from '../../reducers/filmReducer'
import {apiUrl} from './constants'
import axios from 'axios'

export const FilmContext = createContext()

const FilmContextProvider = ({ children }) => {
	// State
	const [filmState, dispatch] = useReducer(filmReducer, {
		film: null,
		films: [],
		filmsLoading: true
	})

	// Get all films
	const getFilms = async () => {
		try {
			const response = await axios.get(`${apiUrl}/films`)
			if (response.data.success) {
				dispatch({ type: 'FILMS_LOADED_SUCCESS', payload: response.data.films })
			}
		} catch (error) {
			dispatch({ type: 'FILMS_LOADED_FAIL' })
		}
	}

    const getFilm = async (filmId) => {
		try {
			const response = await axios.get(`${apiUrl}/films/byId/${filmId}`)
			if (response.data.success) {
				dispatch({ type: 'FILM_LOADED_SUCCESS', payload: response.data})
			}
		} catch (error) {
			dispatch({ type: 'FILM_LOADED_FAIL' })
		}
	}

	// Add film
	const addFilm = async newfilm => {
		try {
			const response = await axios.post(`${apiUrl}/films`, newfilm)
			if (response.data.success) {
				dispatch({ type: 'ADD_FILM', payload: response.data.film })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Delete film
	const deleteFilm = async filmId => {
		try {
			const response = await axios.delete(`${apiUrl}/${filmId}`)
			if (response.data.success)
				dispatch({ type: 'DELETE_FILM', payload: filmId })
		} catch (error) {
			console.log(error)
		}
	}

	// Find film when user is updating film
	const findFilm = filmId => {
		const film = filmState.films.find(film => film._id === filmId)
		dispatch({ type: 'FIND_FILM', payload: film })
	}

	// Update film
	const updateFilm = async updatedfilm => {
		try {
			const response = await axios.put(`${apiUrl}/films/${updatedfilm._id}`,updatedfilm)
			console.log(response.data);
			if (response.data.success) {
				dispatch({ type: 'UPDATE_FILM', payload: response.data.film })
				return response.data.message
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// film context data
	const filmContextData = {
		filmState,
        getFilm,
		getFilms,
		addFilm,
		deleteFilm,
		findFilm,
		updateFilm
	}

	return (
		<FilmContext.Provider value={filmContextData}>
			{children}
		</FilmContext.Provider>
	)
}

export default FilmContextProvider
