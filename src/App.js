import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { Route, Routes, useParams } from "react-router-dom";
import "./App.css";
import AccountMenu from "./components/AccountMenu";
import SideMenu from "./components/SideMenu";
import Login from "./features/Auth/components/Login";
import CategoryFeatures from "./features/Category";
import CategoryList from "./features/Category/components/CategoryList";
import FilmFeatures from "./features/Movies";
import DetailFilmPage from "./features/Movies/page/DetailFilm";
import ListFilmPage from "./features/Movies/page/ListFilm";
import UserFeatures from "./features/UserManagement";

function App() {
  const status = useSelector((state) => state.status);
  return (
    <div className="App">
      <SideMenu />
      <div className={`container ${status ? "inactive" : ""}`}>
        <Paper elevation={3} className="header">
          <AccountMenu />
        </Paper>
        <div className="components">
        <Routes>
          <Route path="/" element={<p>Home</p>}></Route>
          <Route path="/films" element={<FilmFeatures />}>
              <Route path= "/films" element={<ListFilmPage/>}/>
              <Route path= "/films/:filmsId" element={<DetailFilmPage/>}/>
          </Route>
          <Route path="/user-management" element={<UserFeatures />}></Route>
          <Route path="/categories" element={<CategoryFeatures />}>
            <Route path="/categories" element={<CategoryList/>}></Route>
          </Route>
        </Routes>
        </div>
      </div>
      {/* <Login/> */}
    </div>
  );
}

export default App;
