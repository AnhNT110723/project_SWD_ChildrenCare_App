import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import HelloWorld from './components/HelloWorld.jsx';
import Detail from './components/Detail.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Reservation from './pages/Reservation.jsx';
import './App.css'; // Giữ nếu bạn cần style cho App

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Header /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/helloworld" element={<HelloWorld />} />
          <Route path="/detail" element={<Detail />} />
        </Routes>
        <Footer /> 
      </div>
    </BrowserRouter>
  );
}

export default App;