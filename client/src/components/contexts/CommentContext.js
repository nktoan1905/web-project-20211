import { createContext,useReducer } from "react";
import {commentReducer} from '../../reducers/commentReducer'
import { apiUrl } from "./constants";
import axios from "axios";

export const CommentContext = createContext()

const CommentContextProvider = ({children}) =>{
    const [commentState, dispatch] = useReducer(commentReducer, {
        comment:{ },
        comments:[],
        commentsLoading:true
    })

    const getComments = async (filmId) => {
		try {
			const response = await axios.get(`${apiUrl}/comments/${filmId}`)
			if (response.data.success) {
				dispatch({ type: 'COMMENTS_LOADED_SUCCESS', payload: response.data.comments})
				console.log(response.data.comments)
			}
		} catch (error) {
			dispatch({ type: 'COMMENTS_LOADED_FAIL' })
		}
	}


	
	const addComment = async (commentBody,commentParentId,filmId) => {
		try {
			const response = await axios.post(`${apiUrl}/comments/${filmId}`, {commentBody,commentParentId})
			if (response.data.success) {
				dispatch({ type: 'ADD_COMMENT', payload: response.data.comment })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	
	const deleteComment = async commentId => {
		try {
			const response = await axios.delete(`${apiUrl}/comments/${commentId}`)
			if (response.data.success)
				dispatch({ type: 'DELETE_COMMENT', payload: commentId })
		} catch (error) {
			console.log(error)
		}
	}

	
	const findComment = commentId => {
		const comment = commentState.comments.find(comment => comment._id === commentId)
		dispatch({ type: 'FIND_COMMENT', payload: comment })
	}

	
	const updateComment = async (commentBody,commentId) => {
		try {
			console.log(commentBody)
			const response = await axios.put(`${apiUrl}/comments/${commentId}`,{commentBody})
			if (response.data.success) {
				dispatch({ type: 'UPDATE_COMMENT', payload: response.data.comment })
				
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	
	const commentContextData = {
		commentState,
		getComments,
		addComment,
		deleteComment,
		findComment,
		updateComment
	}


    return(
        <CommentContext.Provider value={commentContextData}>
            {children}
        </CommentContext.Provider>
    )
}

export default CommentContextProvider