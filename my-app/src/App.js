import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import BodyFilm from './components/BodyFilm';
function App() {
  return (
    <div className="App">
      <div className="Wrap">
        <Header />
        <BodyFilm />
        <Footer />
      </div>
    </div>
  );
}

export default App;
