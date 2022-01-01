import React, { useContext } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './style.css';
import { FilmContext } from '../../../../contexts/FilmContext';

function ListFilm(props) {
  const {
    filmState: { films },
  } = useContext(FilmContext);

  const newFilms = films.sort((b,a)=> a.point -b.point).slice(0,10);

  const settings = {
    className: 'slider variable-width',
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    variableWidth: true,
  };

  const display = newFilms.map((item) => (
    <div style={{ width: '220px' }}>
      <a href={`/film/${item._id}`}>
        <div>
          <img src={item.image} alt={item.title} />
          <div className="name">{item.title}</div>
          <div className="episode_latest">{item.numOfep}</div>
        </div>
      </a>
    </div>
  ));

  return (
    <div className="wrap">
      <div className="listfilm">
        <Slider {...settings}>{display}</Slider>
      </div>
      <div className="pagination"></div>
    </div>
  );
}

export default ListFilm;
