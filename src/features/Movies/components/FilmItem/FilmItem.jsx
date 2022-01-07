import React from "react";
import PropTypes from "prop-types";
import "./styles.css";
import { Link } from "react-router-dom";
import { apiUrl } from "../../../Constants/constants";
const FilmItem = ({ film = [] }) => {
  return (
    <div className="film-item">
      <Link to={`/films/${film._id}`}>
        <div className="header">
          <div className="img">
            <img src={film.image} alt={film.name} />
          </div>
          <div className="point">
            <span>{film.point}</span>
          </div>
        </div>
        <div className="title">
          <span>{film.title}</span>
        </div>
      </Link>
    </div>
  );
};

FilmItem.propTypes = {
  film: PropTypes.object,
};

export default FilmItem;
