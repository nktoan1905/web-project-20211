import { createContext, useReducer } from "react";
import { subfilmReducer } from "../../reducers/subfilmReducer";
import { apiUrl } from "./constants";
import axios from "axios";

export const SubfilmContext = createContext()

const SubfilmContextProvider = ({children}) =>{
    const [subfilmState,dispatch] = useReducer(subfilmReducer,{
        subfilm:[],
        subfilmLoading:true
    })

    const getSubfilm = async (userId) => {
		try {
			const response = await axios.get(`${apiUrl}/films/subcribe/${userId}`)
			if (response.data.success) {
				dispatch({ type: 'SUBFILM_LOADED_SUCCESS', payload: response.data.userSub})
			}
            console.log(response.data.userSub)
		} catch (error) {
			dispatch({ type: 'SUBFILM_LOADED_FAIL' })
		}
	}

    const addSubfilm = async (userId,filmId,title,image,point,numOfep) => {
		try {
			const response = await axios.post(`${apiUrl}/films/${userId}`, {userId,filmId,title,image,point,numOfep})
			if (response.data.success) {
				dispatch({ type: 'ADD_SUBFILM', payload: response.data.userSub })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	
	const deleteSubfilm = async (userId,filmId) => {
		try {
			const response = await axios.delete(`${apiUrl}/films/subcribe/${userId}/${filmId}`)
			if (response.data.success)
				dispatch({ type: 'DELETE_Subfilm', payload: filmId })
		} catch (error) {
			console.log(error)
		}
	}

    const subfilmContextData = {
		subfilmState,
		getSubfilm,
		addSubfilm,
		deleteSubfilm,
	}

    return(
        <SubfilmContext.Provider value={subfilmContextData}>
            {children}
        </SubfilmContext.Provider>
    )
}

export default SubfilmContextProvider