import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import BodyFilm from './components/BodyFilm';
import { Routes, Route } from 'react-router-dom';
import Locphim from './components/BodyFilm/FilterFilm';
import LichSu from './components/BodyFilm/LichSuXem';
import FollowFilm from './components/BodyFilm/TheoDoiFilm';
import DangNhap from './components/BodyFilm/DangNhap';
function App() {
  return (
    <div className="App">
      <div className="Wrap">
        <Header />
        {/* <BodyFilm /> */}
        <Routes>
          <Route path="/" element={<BodyFilm />} />
          <Route path="/loc-phim" element={<Locphim />} />
          <Route path="/lich-su" element={<LichSu />} />
          <Route path="/theo-doi" element={<FollowFilm />} />
          <Route path="/dang-nhap" element={<DangNhap />} />
        </Routes>

        <Footer />
      </div>
    </div>
  );
}

export default App;
