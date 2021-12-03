import React from 'react';
import DeCu from './FilmDeCu';
import NewUpdate from './MoiCapNhat';
import Page from './Pagination';

function BodyFilm() {
  return (
    <div>
      <DeCu />
      <NewUpdate />
      <Page />
    </div>
  );
}

export default BodyFilm;
