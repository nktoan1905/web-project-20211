import React from 'react'
import { Link } from 'react-router-dom'
import { useState,useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import AlertMessage from '../AlertMessage'
const Login = () => {
    const {loginUser} = useContext(AuthContext)

    const [loginForm, setLoginForm] = useState({
        username:'',
        password:''
    })

    const [alert, setAlert] = useState(null)

    const {username,password} = loginForm

    const onChangeLoginForm = event => setLoginForm({...loginForm,[event.target.name]:event.target.value})

    const login = async event =>{
        event.preventDefault()
        try {
            const loginData = await loginUser(loginForm)
            if(loginData.success) {

            }else{
                setAlert({type:'danger',message:loginData.message})
                setTimeout(() => setAlert(null),3000)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className='row'>
                <div className='offset-3 col-6'>
                    <AlertMessage info={alert}/>
                    <form onSubmit={login}>
                        <div className="mb-3">
                            <label for="username" className="form-label">Tài khoản</label>
                            <input onChange={onChangeLoginForm} value={username} type="text" className="form-control bg-dark" placeholder='Nhập tên tài khoản của bạn' name='username' required/>
                        </div>
                        <div className="mb-3">
                            <label for="password" className="form-label">Mật khẩu</label>
                            <input onChange={onChangeLoginForm} value={password} type="password" className="form-control bg-dark" placeholder='Nhập mật khẩu của bạn' name='password' required/>
                        </div>
                        <div className='text-center'>
                            <button type="submit" className="btn btn-danger">Đăng nhập</button>
                        </div>
                    </form>
                    <div className='text-center mt-3'>
                        <p>Bạn không có tài khoản?{' '}
                            <a href='/register'>
                                <button className='btn btn-success'>Đăng ký</button>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
