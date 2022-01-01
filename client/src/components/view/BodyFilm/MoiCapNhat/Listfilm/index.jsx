import React,{useContext,useEffect,useState} from 'react';
import './style.css';
import { FilmContext } from '../../../../contexts/FilmContext';
import ReactPaginate from "react-paginate";
function ListFilm(props) {
  const {filmState:{films},getFilms} = useContext(FilmContext)
  useEffect(() => getFilms(), [])
  const [pageNumber, setPageNumber] = useState(0);

  const filmsPerPage = 10;
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

  //
 
  console.log(films)
  return (
    <>
      <div className="movie-list">
              {display}
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
    </>
    
    
    
  );
}

export default ListFilm;
