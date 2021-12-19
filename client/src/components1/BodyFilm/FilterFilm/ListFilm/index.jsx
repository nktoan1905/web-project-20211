import React from 'react';
import './style.css';

function ListFilm(props) {
  return (
    <div className="movie-list1">
      <div className="movie-item">
        <a
          href="https://animehay.club//upload/poster/3362.jpg"
          title="Build Divide: Code Black"
        >
          <div className="episode-latest">
            <span>6/??</span>
          </div>
          <div>
            <img src="https://animehay.club//upload/poster/3362.jpg" alt="Phim Build Divide: Code Black" />
          </div>
          <div className="score">9.1</div>
          <div className="name-movie">Build Divide: Code Black</div>
        </a>
      </div>
    </div>
  );
}

export default ListFilm;
