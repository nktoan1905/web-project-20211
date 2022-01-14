import {useState,useEffect,useContext} from 'react'
import { useParams } from 'react-router-dom';
import { FilmContext } from '../../contexts/FilmContext';
import { SubfilmContext } from '../../contexts/SubFilmContext';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Comments from "../../comments/Comments";
import Rating from '../Rating/Rating';
import Player from '../VideoPlayer/Player';
const InfoFilm = () => {
    const {subfilmState:{subfilm},addSubfilm,getSubfilm,deleteSubfilm} = useContext(SubfilmContext)
    const {authState: {isAuthenticated,user}} = useContext(AuthContext)
    const {filmState:{film,filmsLoading},getFilm,updateFilm} = useContext(FilmContext)
    let {id}  = useParams();
    let navigate = useNavigate()
    const [rating, setRating] = useState(0);
    const [ratingNum,setRatingNum] = useState(0);
    const [ratingSum,setRatingSum] = useState(0);
    const [ratingEverage,setRatingEverage] = useState(0);
    const [subcribe,setSubcribe] = useState(false)    

    const [updatedFilm,setUpdatedFilm] = useState({})

    const handleChange = (value) => {
        setRating(value);
        setRatingNum(film.film.reviewerNum+1)
        setRatingSum(film.film.reviewerNum * film.film.point + value)
           
    }

    // useEffect(() => {getFilm(id)},[])
    
    const handleSubcribe = () =>{
        getSubfilm(user._id)
            subfilm.forEach(filmsub =>{
                if(filmsub.filmId === film.film._id){
                    setSubcribe(true)
            }
        })
    }

    useEffect(() => {
        getFilm(id)
        // console.log(film)
        return () =>{
            if(user !== null)
            {
                
                if(film !== null){
                    // console.log(subfilm)
                    // console.log(film.film)
                    getSubfilm(user._id)
                    subfilm.forEach(filmsub =>{
                        if(filmsub.filmId === film.film._id){
                            setSubcribe(true)
                        }
                    })
                }
            
            }
            // console.log(subcribe)  
            }  
        
    },[id])

    const notify = () => toast("Đã theo dõi thành công");
    const notifyCancel = () => toast("Đã bỏ theo dõi")

    useEffect(() => {
        if(ratingNum!== 0){
            setRatingEverage(ratingSum/ratingNum)
            console.log({...film.film,reviewerNum:ratingNum,point:ratingSum/ratingNum});
            updateFilm({...film.film,reviewerNum:ratingNum,point:ratingSum/ratingNum})
        }
    }, [ratingNum,ratingSum])


    return (
        <>
            <div className="d-flex justify-content-center">
            
                <ToastContainer />
                
                <div className="container-fix p-3">
                {filmsLoading &&
                            
                        <div className='d-flex justify-content-center mt-2' style={{height:'100vh'}}>
                                <div className="spinner-border text-danger align-self-center"  role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                        </div>
                }
                {film !== null && film.film !== null &&<>
                    <div className="card bg">
                

                        <div className="card-header text-center">
                        {film.film.title}
                        </div>
                        <div className="card-body bg-dark text-white">
                        <div className="row p-4">
                            <div className="col-lg-3 col-sm-12">
                                <img src={film.film.image} className="img-thumbnail-fix" alt="ảnh minh họa"/>
                            </div>

                            <div className="col">
                                <ul className="list-group list-group-flush ">
                                    <li className="list-group-item-fix">
                                        <div className="row">
                                            <div className="col-4">Tên</div>
                                            <div className="col-8 text-center">{film.film.title}</div>
                                        </div>
                                    </li>
                                    <li className="list-group-item-fix"> 
                                        <div className="row">
                                            <div className="col-4">Thể loại</div>
                                            <div className="col-8 text-center">
                                                {film.categories && film.categories.map(cate => {
                                                    return(
                                                        <><button key={cate._id} className='btn btn-secondary btn-sm mb-1'><a href={`/filter/category/${cate.name}`}>{cate.name}</a></button>{' '}</>
                                                    )
                                                })}    
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-group-item-fix">
                                        <div className="row">
                                            <div className="col-4">Điểm</div>
                                            <div className="col-8 text-center">{ratingEverage ? ratingEverage.toFixed(2) : film.film.point.toFixed(2)} || {ratingNum ? ratingNum : film.film.reviewerNum} đánh giá</div>
                                        </div>
                                    </li>
                                    <li className="list-group-item-fix">
                                        <div className="row">
                                            <div className="col-4">Phát hành</div>
                                            <div className="col-8 text-center">{film.film.year}</div>
                                        </div>
                                    </li>
                                    <li className="list-group-item-fix">
                                        <div className="row">
                                            <div className="col-4">Thời lượng</div>
                                            <div className="col-8 text-center">{film.film.numOfep}</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        </div>
                        
                    
                    </div>
                    <div className="card mt-2 bg">
                        <div className="card-header">
                            <ul className="nav nav-pills card-header-pills">
                                <li className="nav-item me-1">
                                    <button type="button" className="btn btn-play" ><i className="bi bi-play-circle fs-4"></i></button>
                                </li>
                                {isAuthenticated && !subcribe &&
                                <li className="nav-item">
                                    <button onClick={()=>{addSubfilm(user._id,film.film._id,film.film.title,film.film.image,film.film.point,12);notify();setSubcribe(true)}} type="button" className="btn btn-book"><i className="bi bi-clipboard-plus fs-4"></i></button>
                                    
                                </li>
                                }
                                {subcribe &&
                                    <li className="nav-item">
                                        <button onClick={()=>{deleteSubfilm(user._id,film.film._id);notifyCancel();setSubcribe(false)}} type="button" className="btn btn-book"><i class="bi bi-folder-minus fs-4"></i></button>
                                                                
                                    </li> 
                                }
                                <li className="nav-item ms-auto">
                                    <button type="button" className="btn btn-star" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="bi bi-star fs-4"></i></button>
                                </li>
                            </ul>
                            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered ">
                                <div className="modal-content bg-dark">
                                    <div className="modal-header">
                                        <h5  id="exampleModalLabel">Đánh giá phim</h5>
                                        <button type="button" className="btn-close bg-danger" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body text-center">
                                    {isAuthenticated ?
                                    <Rating 
                                        count={10}
                                        size={40}
                                        value={rating}
                                        activeColor ={'red'}
                                        inactiveColor={'#ddd'}
                                        onChange={handleChange}  
                                    />
                                    : <a href='/login' className="btn btn-danger w-200">Đăng nhập để đánh giá</a>
                                    }
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 col-12 mt-2">
                            <div className="card bg card-height">
                                <div className="card-header">Danh sách tập</div>
                                <div className="card-body">
                                    {(film.episodes.sort((a,b)=> a.epNum -b.epNum).map(ep => <Player key={ep._id} ep={ep}/>))}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-12 mt-2">
                            <div className="card bg card-height">
                                <div className="card-header">Nội dung</div>
                                <div className="card-body">
                                    {film.film.description}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Comments filmId={id} isAuthenticated={isAuthenticated} currentUser={user}/>
                </>}
                </div>
                
                
            </div> 
        </>
       
    )
}

export default InfoFilm
