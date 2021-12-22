import { AuthContext } from './contexts/AuthContext'
import { useContext } from 'react'
import { Link,useNavigate } from 'react-router-dom'
const Header = () => {
    const {authState: {isAuthenticated,user},logoutUser} = useContext(AuthContext)
    let navigate = useNavigate()
    const goHome =() =>{
        navigate('/')
    }
    const logout = () => logoutUser()
    return (
        <div className="d-flex justify-content-center">
            <div className='container-fix'>
                <nav class="navbar navbar-expand-lg navbar-light bg-dark">
                    <div class="container-fluid pb-1">
                        <Link class="navbar-brand" to='/'>
                            <img className='w-200' src="https://animehay.club/themes/img/logo.png" alt="logo"/>
                        </Link>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className='nav-item d-flex align-items-center'>
                                <form class="ms-5 d-flex search-input">
                                    <input className="form-control bg text-white" type="search" placeholder="Nhập từ khóa..." aria-label="Search"/>
                                    <span type="submit" className="ms-0 bg"><i className="bi bi-search"></i></span>
                                </form>
                            </li>
                            {!isAuthenticated &&
                            <li className="nav-item">
                                <Link to='/login'>
                                    <div className="button-header"><i className="bi bi-box-arrow-in-right"></i></div>
                                </Link>
                            </li>
                            }
                            {isAuthenticated &&
                            <li class="nav-item dropdown">
                                <span className="dropdown-toggle" role="button" data-bs-toggle="dropdown">
                                    <div className="button-header"><i class="bi bi-person-circle"></i></div>
                                </span>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/">{user.username}</Link></li>
                                    <li><button onClick={() => {logout();goHome()}} className="dropdown-item"><i class="bi bi-box-arrow-right"></i>{' '}Đăng xuất</button></li>
                                </ul>
                            </li>
                            }
                            <li className="nav-item">
                                <a href='/subcribe'>
                                    <div className="button-header"><i className="bi bi-file-plus"></i></div>
                                </a>
                            </li>
    
                        </ul>
                        
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Header
