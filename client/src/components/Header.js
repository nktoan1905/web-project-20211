import { AuthContext } from './contexts/AuthContext'
import { useContext,useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import SearchBar from './view/SearchBar'
import 'antd/dist/antd.css';
import { Menu, Dropdown,Tabs } from 'antd';
import {FilmContext} from './contexts/FilmContext'
import {category,years} from '../../src/components/view/Datas'

const { TabPane } = Tabs;

const Header = () => {
    const {authState: {isAuthenticated,user},logoutUser} = useContext(AuthContext)
    const {filmState:{films},getFilms} = useContext(FilmContext)
    let navigate = useNavigate()
    const goHome =() =>{
        navigate('/')
    }

    useEffect(() => {
        getFilms()
      
    }, [])

    console.log(category);
    const menu = (
        <Menu>
          <Tabs type="card">
                <TabPane tab="Thể loại" key="1">
                    <div className="d-flex flex-wrap tab-category">
                        {category.map(element =>{
                            return(
                                <div key={element._id} className='tab-content'>
                                    <a href={`/filter/category/${element.name}`}>{element.name}</a>
                                </div>
                            )
                        })}
                    </div>
                </TabPane>
                <TabPane tab="Năm sản xuất" key="2">
                    <div className="d-flex flex-wrap tab-category">
                        {years.map(element =>{
                            return(
                                <div key={element._id} className='tab-content'>
                                    <a href={`/filter/year/${element.name}`}>{element._id}</a>
                                </div>
                            )
                        })}
                    </div>
                </TabPane>
                <TabPane tab="Lọc phim" key="3" >
                    <a href='/filter'>
                        <button className='btn btn-secondary'>Đi đến trang lọc phim</button>
                    </a>
                </TabPane>
            </Tabs>
        </Menu>
    );
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
                                <SearchBar placeholder="Nhập từ khóa..." data={films}></SearchBar> 
                            </li>
                            <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    <div className="button-header"><i class="bi bi-list"></i></div>
                                </a>
                            </Dropdown>
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
