import React from 'react'
import { Link } from 'react-router-dom'
import { useState,useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import AlertMessage from '../AlertMessage'
import { ToastContainer, toast } from 'react-toastify';
import  axios  from 'axios'
const Register = () => {
    const {authState:{authLoading},registerUser} = useContext(AuthContext)
    const [imageSeleted,setImageSelected] = useState("")
    const [registerForm, setRegisterForm] = useState({
        username:'',
        password:'',
        confirmPassword:'',
        avatar:''
        
    })

    const notify = () => toast("Tải lên thành công");
    const notifyFail = () => toast("Tải lên thất bại")

    const [alert, setAlert] = useState(null)

    const {username,password,confirmPassword,avatar} = registerForm

    const onChangeRegisterForm = event => setRegisterForm({...registerForm,[event.target.name]:event.target.value})
    
    const uploadImage = async () =>{
        
        const formData = new FormData()
        formData.append("file",imageSeleted)
        formData.append("upload_preset","mqdx4b7z")
        try{
            const res = await axios.post("https://api.cloudinary.com/v1_1/gnourt/image/upload",formData,{
            'Access-Control-Allow-Origin': '*'
            })
            console.log(res)
            if(res.statusText === 'OK')
                notify()
 
            setRegisterForm({...registerForm,avatar:res.data.url})
        }catch(error){
            notifyFail()
        }        
    }

    const register = async event =>{
        
        event.preventDefault()
        if(password !== confirmPassword){
            setAlert({type:'danger',message:'Password do not match'})
            setTimeout(() => setAlert(null),3000)
            return
        }
        try {
            const registerData = await registerUser(registerForm)
            if(registerData.success) {

            }else{
                setAlert({type:'danger',message:registerData.message})
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
                    <ToastContainer />
                    <AlertMessage info={alert}></AlertMessage>
                    <div className="mb-3">
                            <label for="avatar" className="form-label">Ảnh đại diện</label>
                            <div className='d-flex'>
                                <input className="form-control bg-dark" type="file" onChange={(event) => {setImageSelected(event.target.files[0])}}/> 
                                <button onClick={() => uploadImage()} className="col-2 btn btn-danger text-white">Tải lên</button>               
                            </div>
                    </div>
                    <form onSubmit={register}>
                        <div className="mb-3">
                            <label for="username" className="form-label">Tài khoản</label>
                            <input onChange={onChangeRegisterForm} value={username} type="text" className="form-control bg-dark" placeholder='Nhập tên tài khoản của bạn' name='username' required/>
                        </div>
                        <div className="mb-3">
                            <label for="password" className="form-label">Mật khẩu</label>
                            <input onChange={onChangeRegisterForm} value={password} type="password" className="form-control bg-dark" placeholder='Nhập mật khẩu của bạn' name='password' required/>
                        </div>
                        <div className="mb-3">
                            <label for="confirmPassword" className="form-label">Nhập lại Mật khẩu</label>
                            <input onChange={onChangeRegisterForm} value={confirmPassword} type="password" className="form-control bg-dark" placeholder='Nhập lại mật khẩu của bạn' name='confirmPassword' required/>
                        </div>
                        {/* <div className="mb-3">
                            <label for="avatar" className="form-label">Ảnh đại diện</label>
                            <div className='d-flex'>
                                <input className="form-control bg-dark" type="file" onChange={(event) => {setImageSelected(event.target.files[0])}}/>                
                            </div>
                        </div> */}
                        <div className='text-center'>
                            <button type="submit" className="btn btn-info text-white">Đăng ký</button>
                            {/* <button onClick={() => uploadImage()} className="btn btn-info text-white">Đăng ký</button> */}
                        </div>
                        
                    </form>
                    
                    <div className='text-center mt-3'>
                        <p>Bạn đã có tài khoản?{' '}
                            <Link to='/login'>
                                <button className='btn btn-danger'>Đăng nhập</button>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register