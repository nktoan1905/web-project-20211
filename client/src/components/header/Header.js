import { AuthContext } from '../contexts/AuthContext'
import { useContext,useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import SearchBar from '../view/Search/SearchBar'
import 'antd/dist/antd.css';
import { Menu, Dropdown,Tabs, Avatar, Image } from 'antd';
import {FilmContext} from '../contexts/FilmContext'
import {category,years} from '../view/Datas'
import { UserOutlined } from '@ant-design/icons';

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
                <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                    <div className="container-fluid pb-1">
                        <Link className="navbar-brand" to='/'>
                            <img className='w-200' src="https://animehay.club/themes/img/logo.png" alt="logo"/>
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className='nav-item d-flex align-items-center'>
                                <SearchBar placeholder="Nhập từ khóa..." data={films}></SearchBar> 
                            </li>
                            <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    <div className="button-header"><i className="bi bi-list"></i></div>
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
                            <li className="nav-item dropdown">
                                <span role="button" data-bs-toggle="dropdown">
                                    <div className="button-header"><i className="bi bi-person-circle"></i></div>
                                </span>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li className='text-center'><Avatar size={{xs: 24,sm: 32,md: 40,lg: 64,xl: 80,xxl: 100,}} src={user.avatar} icon={<UserOutlined />}/></li>
                                    <li className='text-center'><Link className="dropdown-item" to="/">{user.username}</Link></li>
                                    <li className='text-center'><button onClick={() => {logout();goHome()}} className="dropdown-item"><i className="bi bi-box-arrow-right"></i>{' '}Đăng xuất</button></li>
                                </ul>
                            </li>
                            }
                            <li className="nav-item">
                                <Link to='/subcribe'>
                                    
                                    <div className="button-header"><i className="bi bi-file-plus"></i></div>
                                </Link>
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
