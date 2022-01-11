import React, { useState,useContext } from "react";
import { NavLink } from "react-router-dom";
import "./styles.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HomeIcon from "@mui/icons-material/Home";
import MovieIcon from "@mui/icons-material/Movie";
import CategoryIcon from "@mui/icons-material/Category";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import logo from "../../logo.png";
import { changeStatus } from "./inactiveSlice";
import { useDispatch, useSelector } from "react-redux";

import { AuthContext } from "../../contexts/AuthContext";

const SideMenu = (props) => {
  const {authState:{authLoading,isAuthenticated}} = useContext(AuthContext)
  const [inactive, setInactive] = useState(false);
  const dispatch = useDispatch();
  const status = useSelector((state) => state.status);
  const handleChangeStatusClick = () => {
    const action = changeStatus();
    dispatch(action);
  };
  return (
    <>
      {isAuthenticated &&
      <div className={`side-menu ${status ? "inactive" : ""}`}>
            <div className="top-section">
              <div className="logo">
                <img src={logo} alt="Anime hay" />
              </div>
              <div className="toggle-menu-btn" onClick={handleChangeStatusClick}>
                {!status ? <ArrowBackIcon /> : <ArrowForwardIcon />}
              </div>
            </div>
            <div className="divider"></div>
            <div className="main-menu">
              <ul>
                <li>
                  <NavLink to="/" className="menu-item">
                    <div className="menu-icon">
                      <HomeIcon />
                    </div>
                    <span>Home</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/films" className="menu-item">
                    <div className="menu-icon">
                      <MovieIcon />
                    </div>
                    <span>Films</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/categories" className="menu-item">
                    <div className="menu-icon">
                      <CategoryIcon />
                    </div>
                    <span>Category</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/user-management" className="menu-item">
                    <div className="menu-icon">
                      <ManageAccountsIcon />
                    </div>
                    <span>User Management</span>
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="divider"></div>
            <div className="side-menu-footer">
              <div className="avatar">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="img user"
                />
              </div>
              <div className="user-info">
                <h5>Admin</h5>
              </div>
            </div>
          </div>
      }
    </>
    
  );
};

SideMenu.propTypes = {};

export default SideMenu;
