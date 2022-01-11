import React from 'react';
import ListFilm from './ListFilm';
import '../style.css';

function DeCu(props) {
  return (
    <div className="overview">
      <div className="wrap-title">
        <div className="title">Phim đề cử </div>
      </div>
      <ListFilm />
    </div>
  );
}

export default DeCu;
