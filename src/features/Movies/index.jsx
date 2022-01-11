import { Outlet,useNavigate } from 'react-router-dom'
import React,{useContext} from 'react'
import { AuthContext } from '../../contexts/AuthContext'
const FilmFeatures = () => {
    const {authState:{authLoading,isAuthenticated}} = useContext(AuthContext)
    let navigate = useNavigate()
    return (
        <div>
            {!isAuthenticated && navigate('/login')}
            <Outlet/>
        </div>
    )
}

export default FilmFeatures
