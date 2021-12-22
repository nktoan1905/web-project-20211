export const subfilmReducer = (state, action) => {
    const {type, payload} = action
    switch (type) {
        case 'SUBFILM_LOADED_SUCCESS':
			return {
				...state,
				subfilm:payload,
				subfilmLoading: false
				
			}

		case 'SUBFILM_LOADED_FAIL':
			return {
				...state,
				subfilm: [],
				subfilmLoading: false
			}


		case 'ADD_SUBFILM':
			return {
				...state,
				subfilm: [...state.subfilm, payload]
			}

		case 'DELETE_SUBFILM':
			return {
				...state,
				subfilm: state.subfilm.filter(film => film.filmId !== payload)
			}

        default:
            return state
    }
}