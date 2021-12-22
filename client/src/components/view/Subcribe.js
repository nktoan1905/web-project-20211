import {useContext,useEffect} from 'react'
import '../../components1/BodyFilm/MoiCapNhat/Listfilm/style.css'
import { SubfilmContext } from '../contexts/SubFilmContext'
import { AuthContext } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

const Subcribe = () => {
    const {subfilmState:{subfilm},getSubfilm,deleteSubfilm} = useContext(SubfilmContext)
    const {authState:{user,isAuthenticated}} = useContext(AuthContext)
    useEffect(() => {
        //
       
        if(user !== null)
            getSubfilm(user._id)
        
    })

    const body = (
        <>
        {subfilm.length !==0 && 
        subfilm.map(film => (
                            
            <div key={film.filmId} className="movie-item">
                <Link
                to={`/film/${film.filmId}`}
                >
                <div className="episode-latest">
                    <span>6/??</span>
                </div>
                <div>
                    <img src={film.image} alt={film.title} />
                </div>
                <div className="score">{film.point}</div>
                <div className="name-movie">{film.title}</div>
                
                </Link>
                
                <button onClick={() => deleteSubfilm(user._id,film.filmId)} className='close'><i class="bi bi-x-lg"></i></button>
                
            
            </div>
        
        ))
        }
        </>
    )

    console.log(subfilm);
    return (
        <div className="d-flex justify-content-center">
        <div className="container-fix p-3">
            <div className="card bg card-height">
                    <div className="card-header">Phim đã đăng ký</div>
                    {isAuthenticated && subfilm.length !== 0 &&
                        <div className="card-body d-flex">
                        {body}
                    </div>
                    }
            </div>
        </div>
    </div>
    )
}

export default Subcribe
