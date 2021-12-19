import React from 'react';
import CategoryIcon from '@mui/icons-material/Category';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import './style.css';
import { Routes, Route } from 'react-router';
import Category from './Category';
import { NavLink } from 'react-router-dom';
import Year from './Year';
function Menuuu(props) {
  const temp = props.downFunc;
  const overFlowStyle = {
    display: temp.status ? 'none' : 'block',
  };

  return (
    <div className="overflow" style={overFlowStyle}>
      <div className="tab-link">
        <NavLink to="/category" exact activeClassName="active">
          <CategoryIcon className="icon-round">category</CategoryIcon>
          Thể loại
        </NavLink>
        <NavLink to="/years" exact activeClassName="active">
          <AutoAwesomeIcon className="icon-round">autoawesome</AutoAwesomeIcon>
          Năm
        </NavLink>
        <a href="/">
          <FilterAltIcon className="icon-round">filteralt</FilterAltIcon>
          Lọc phim
        </a>
        <a href="/">
          <AutoAwesomeIcon className="icon-round">autoawesome</AutoAwesomeIcon>
          Phim lẻ
        </a>
      </div>
      <Routes>
        <Route path="/category" element={<Category />} />
        <Route path="/years" element={<Year />} />
      </Routes>
    </div>
  );
}

export default Menuuu;
