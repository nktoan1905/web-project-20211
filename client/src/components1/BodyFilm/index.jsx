import React from 'react';
import DeCu from './FilmDeCu';
import NewUpdate from './MoiCapNhat';
import Page from './Pagination';

function BodyFilm() {
  return (
    <div className='d-flex justify-content-center'>
      <div className='container-fix'>
        <DeCu />
        <NewUpdate />
        
      </div>

    </div>
  );
}

export default BodyFilm;
