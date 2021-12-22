import React,{useContext,useEffect} from 'react';
import './style.css';
import { FilmContext } from '../../../../components/contexts/FilmContext';

function ListFilm(props) {
  const {filmState:{films},getFilms} = useContext(FilmContext)
  useEffect(() => getFilms(), [])
  console.log(films)
  return (
    <div className="movie-list">
    {films.map(film => (
      
      <div key={film._id} className="movie-item">
        <a
          href={`/film/${film._id}`}
        >
          <div className="episode-latest">
            <span>6/??</span>
          </div>
          <div>
            <img src={film.image} alt={film.title} />
          </div>
          <div className="score">{film.point}</div>
          <div className="name-movie">{film.title}</div>
        </a>
      </div>
    
    ))}
    </div>
    
  );
}

export default ListFilm;
