import React, { Fragment } from 'react';
import './style.css';
import SearchIcon from '@mui/icons-material/Search';
import ReorderIcon from '@mui/icons-material/Reorder';
import HistoryIcon from '@mui/icons-material/History';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LoginIcon from '@mui/icons-material/Login';
import { Routes, Route, Link } from 'react-router-dom';

function Narbar(props) {
  const changeStatus = props.changeStatusFunc;
  const defaultStop = (e) => {
    e.preventDefault();
  };
  return (
    <Fragment>
      <div className="over">
        <div className="logo">
          <a href="/">
            <img src="https://animehay.site/themes/img/logo.png" alt="logo animehay" />
          </a>
        </div>

        <div className="search">
          <form>
            <input type="text" placeholder="Nhập từ khóa" />
            <button type="submit">
              <SearchIcon className="material-icon">search</SearchIcon>
            </button>
          </form>
        </div>

        <div className="nav-items">
          <a href="/" onClick={changeStatus}>
            <ReorderIcon className="material-icon">reorer</ReorderIcon>
          </a>
          <Link to="/lich-su">
            <HistoryIcon className="material-icon">history</HistoryIcon>
          </Link>
          <Link to="/theo-doi">
            <BookmarkIcon className="material-icon">bookmark</BookmarkIcon>
          </Link>
          <a href="/" onClick={defaultStop}>
            <LoginIcon className="material-icon">login</LoginIcon>
          </a>
        </div>
      </div>
    </Fragment>
  );
}

export default Narbar;
