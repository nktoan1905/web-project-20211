export const commentReducer = (state, action) => {
    const {type, payload} = action
    switch (type) {
        case 'COMMENTS_LOADED_SUCCESS':
			return {
				...state,
				comments:payload,
				commentsLoading: false
				
			}

		case 'COMMENTS_LOADED_FAIL':
			return {
				...state,
				comments: [],
				commentsLoading: false
			}


		case 'ADD_COMMENT':
			return {
				...state,
				comments: [...state.comments, payload]
			}

		case 'DELETE_COMMENT':
			return {
				...state,
				posts: state.comments.filter(comment => comment._id !== payload)
			}

		case 'FIND_COMMENT':
			return { ...state, comment: payload }

		case 'UPDATE_COMMENT':
			const newComments = state.comments.map(comment =>
				comment._id === payload._id ? payload : comment
			)

			return {
				...state,
				comments: newComments
			}
        default:
            return state
    }
}