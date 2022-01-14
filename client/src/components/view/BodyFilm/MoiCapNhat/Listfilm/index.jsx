import React,{useContext,useEffect,useState} from 'react';
import './style.css';
import { FilmContext } from '../../../../contexts/FilmContext';
import ReactPaginate from "react-paginate";
import { Link } from 'react-router-dom';
function ListFilm(props) {
  const {filmState:{films,filmsLoading},getFilms} = useContext(FilmContext)
  useEffect(() => getFilms(), [])
  const [pageNumber, setPageNumber] = useState(0);

  const filmsPerPage = 15;
  const pagesVisited = pageNumber * filmsPerPage;

    const display = films.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )
    .slice(pagesVisited, pagesVisited + filmsPerPage)
    .map(film => (
      
      <div key={film._id} className="movie-item">
        <Link to={`/film/${film._id}`}>
          
          <div className="episode-latest">
            <span>{film.numOfep} tập</span>
          </div>
          <div>
            <img src={film.image} alt={film.title} />
          </div>
          <div className="score">{film.point}</div>
          <div className="name-movie">{film.title}</div>
          </Link>
      </div>
    
    ))

  // const pageCount = Math.ceil(films.length / filmsPerPage);
  const pageCount = Math.ceil(films.length / filmsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  //
 
  console.log(films)
  return (
    <>
        {filmsLoading &&
                        
            <div className='d-flex justify-content-center mt-2' style={{height:'322px'}}>
                  <div className="spinner-border text-danger align-self-center"  role="status">
                      <span className="visually-hidden">Loading...</span>
                  </div>
            </div>
        }
      <div className="movie-list">
              {display}
      </div>
      {!filmsLoading &&
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
      }
      
    </>
    
    
    
  );
}

export default ListFilm;
