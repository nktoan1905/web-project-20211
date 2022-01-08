import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { Route, Routes, useParams,BrowserRouter } from "react-router-dom";
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
import AuthContextProvider from './contexts/AuthContext'
import Home from "./features/Home/Home";


function App() {
  const status = useSelector((state) => state.status);
  return (
    <div className="App">
      <AuthContextProvider>
        <BrowserRouter>
          <SideMenu />
          <div className={`container ${status ? "inactive" : ""}`}>
              <AccountMenu />
            
            <div className="components">
            
              <Routes>
              <Route path='/login' element={<Login></Login>}></Route>
              <Route path="/" element={<Home></Home>}></Route>
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
        </BrowserRouter>
      </AuthContextProvider>
      {/* <Login/> */}
    </div>
  );
}

export default App;
