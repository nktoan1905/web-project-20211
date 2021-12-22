import './App.css';
import Footer from './components1/Footer/index.jsx'
import BodyFilm from './components1/BodyFilm/index.jsx';
import Locphim from './components1/BodyFilm/FilterFilm/index.jsx';
import InfoFilm from "./components/InfoFilm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import Auth from "./components/view/Auth";
import AuthContextProvider from "./components/contexts/AuthContext";
import FilmContextProvider from "./components/contexts/FilmContext";
import Header from "./components/Header";
import CommentContextProvider from "./components/contexts/CommentContext";
import Subcribe from './components/view/Subcribe';
import SubfilmContextProvider from './components/contexts/SubFilmContext';
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
                            <Route exact path="/loc-phim" element={<Locphim />} />
                            <Route exact path='/film/:id' element={<InfoFilm/>}/>
                            <Route exact path='/login' element={<Auth authRoute='login'/>}/>
                            <Route exact path='/register' element={<Auth authRoute='register'/>}/>
                            <Route exact path='/subcribe' element={<Subcribe/>}/>
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
