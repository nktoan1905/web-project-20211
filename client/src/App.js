import './App.css';
import Footer from './components/Footer/index.jsx'
import BodyFilm from './components/view/BodyFilm/index.jsx';
import InfoFilm from "./components/view/Film/InfoFilm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./components/view/Auth/Auth";
import AuthContextProvider from "./components/contexts/AuthContext";
import FilmContextProvider from "./components/contexts/FilmContext";
import Header from "./components/header/Header";
import CommentContextProvider from "./components/contexts/CommentContext";
import Subcribe from './components/view/Film/Subcribe';
import SubfilmContextProvider from './components/contexts/SubFilmContext';
import Filter from './components/view/Film/Filter';
function App() {
  return (
      <AuthContextProvider>
        <SubfilmContextProvider>
          <FilmContextProvider>
            <CommentContextProvider>
              <BrowserRouter>
                    <div className="landing">
                        <Header></Header>
                        <Routes>
                            <Route exact path="/" element={<BodyFilm />} />
                            <Route exact path='/film/:id' element={<InfoFilm/>}/>
                            <Route exact path='/login' element={<Auth authRoute='login'/>}/>
                            <Route exact path='/register' element={<Auth authRoute='register'/>}/>
                            <Route exact path='/subcribe' element={<Subcribe/>}/>
                            <Route exact path='/filter' element={<Filter/>}/>
                            <Route exact path='/filter/:follow/:id' element={<Filter/>}/>
                        </Routes>
                        <Footer/>
                    </div>
                </BrowserRouter>
          </CommentContextProvider>
        </FilmContextProvider>
      </SubfilmContextProvider>
    </AuthContextProvider>
  );
}

export default App;
