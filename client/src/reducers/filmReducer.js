export const filmReducer = (state, action) => {
	const { type, payload } = action
	switch (type) {
		case 'FILMS_LOADED_SUCCESS':
			return {
				...state,
				films: payload,
				filmsLoading: false
			}

		case 'FILMS_LOADED_FAIL':
			return {
				...state,
				films: [],
				filmsLoading: false
			}


        case 'FILM_LOADED_SUCCESS':
			return {
				...state,
				film: payload,
				filmsLoading: false
			}

		case 'FILM_LOADED_FAIL':
			return {
				...state,
				film: null,
				filmsLoading: false
			}

		case 'ADD_FILM':
			return {
				...state,
				films: [...state.films, payload]
			}

		case 'DELETE_FILM':
			return {
				...state,
				films: state.films.filter(film => film._id !== payload)
			}

		case 'FIND_FILM':
			return { ...state, FILM: payload }

		case 'UPDATE_FILM':
			const newfilms = state.films.map(film =>
				film._id === payload._id ? payload : film
			)

			return {
				...state,
				films: newfilms
			}

		default:
			return state
	}
}