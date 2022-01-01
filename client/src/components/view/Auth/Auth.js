import Login from '../../auth/Login'
import Register from '../../auth/Register'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react'
import {Navigate} from 'react-router-dom'

const Auth = ({authRoute}) => {
    const {authState: {authLoading, isAuthenticated}} = useContext(AuthContext)
    let body
    if(authLoading){
        body = (
            <div className='d-flex justify-content-center mt-2'>
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }else if(isAuthenticated) return <Navigate to='/'/>

    body = (
        <>
            {authRoute === 'login' && <Login/>}
            {authRoute === 'register' && <Register/>}
        </>
    )
        
    return (
        <>
            <div className="d-flex justify-content-center">
                <div className="container-fix p-3">
                    <div className="card bg card-height">
                            <div className="card-header">{authRoute === 'login' && "Đăng Nhập"} {authRoute === 'register' && "Đăng ký"}</div>
                            <div className="card-body">
                                {body}
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Auth
