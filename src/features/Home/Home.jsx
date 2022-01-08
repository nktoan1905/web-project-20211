import React,{useContext} from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
const Home = () => {
    const {authState:{authLoading,isAuthenticated}} = useContext(AuthContext)
    let navigate = useNavigate()

    return (
        <div>
            {!isAuthenticated && navigate('/login')}
            Home
        </div>
    )
}

export default Home
