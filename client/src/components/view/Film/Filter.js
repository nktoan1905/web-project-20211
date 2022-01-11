import {useState,useEffect} from 'react'
import CheckBox from './CheckBox'
import { category,years } from '.././Datas'
import axios from 'axios'
import { apiUrl } from '../../contexts/constants'
import '../../../components/view/BodyFilm/MoiCapNhat/Listfilm/style.css'
import ReactPaginate from 'react-paginate'
import { useParams } from 'react-router-dom'
const Filter = () => {
    let {id,follow} = useParams()
    console.log(id);
    const [films,setFilms] = useState([])
    const [Filters, setFilters] = useState({
        category: [],
        year:[],
    })

    const [pageNumber, setPageNumber] = useState(0);

    const getFilms = async(filters) =>{
        try {
			const response = await axios.post(`${apiUrl}/films/getFilms`,{filters})
			if (response.data.success) {
				setFilms(response.data.listOfFilm)
			}
		} catch (error) {
			
		}
    }

    useEffect(() => {
        if(id){
            if(follow === "category")
                getFilms({category:[id]})
            else
                getFilms({year:[id]})
        }else{
            getFilms([])
        }
        
    },[])

    const showFilteredResults = (filters) => {
        getFilms(filters)
    }

    const handleFilters = (filters,key) => {

        const newFilters = { ...Filters }
        newFilters[key] = filters

        showFilteredResults(newFilters)
        setFilters(newFilters)
        console.log(newFilters)
        
    }

    

    const filmsPerPage = 3;
    const pagesVisited = pageNumber * filmsPerPage;

    const display = films
    .slice(pagesVisited, pagesVisited + filmsPerPage)
    .map(film => (
      
      <div key={film._id} className="movie-item">
        <a
          href={`/film/${film._id}`}
        >
          <div className="episode-latest">
            <span>??/{film.numOfep}</span>
          </div>
          <div>
            <img src={film.image} alt={film.title} />
          </div>
          <div className="score">{film.point}</div>
          <div className="name-movie">{film.title}</div>
        </a>
      </div>
    
    ))

    // const pageCount = Math.ceil(films.length / filmsPerPage);
    const pageCount = Math.ceil(films.length / filmsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div className="d-flex justify-content-center">
            <div className='container-fix p-3'>
                <div class="card" style={{backgroundColor : 'black', width:'150px'}}>
                    <div class="card-header">
                        {id ? "Phim "+ id :"Trang lọc phim"}
                    </div>
                </div>
                <CheckBox title={"Thể loại"} list={category} handleFilters={filters => handleFilters(filters, 'category')}></CheckBox>
                <CheckBox title={"Năm sản xuất"} list={years} handleFilters={filters => handleFilters(filters, 'year')}></CheckBox>
                
                <div className="movie-list">
                    {films.length === 0 ?
                    <div style={{ color:'#ccc',display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                        <h2>Không tìm thấy...</h2>
                    </div> :
                        display
                    }
                </div>
                <div className='mt-5'>
                    <ReactPaginate
                        previousLabel={"Trước"}
                        nextLabel={"Sau"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"paginationBttns"}
                        previousLinkClassName={"previousBttn"}
                        nextLinkClassName={"nextBttn"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"paginationActive"}
                    />
                </div>
            </div>
        </div>
    )
}

export default Filter
