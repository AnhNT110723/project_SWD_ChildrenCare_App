import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Homepage from './pages/Homepage.jsx';
import HelloWorld from './components/HelloWorld.jsx';
import Detail from './components/Detail.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Reservation from './pages/Reservation.jsx';
import './App.css'; // Giữ nếu bạn cần style cho App
import Payment from './pages/Payment.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Homepage" element={<Homepage />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/helloworld" element={<HelloWorld />} />
          <Route path="/detail" element={<Detail />} />
          {/* route detail mai làm */}
          {/* <Route path="/blog/:id" element={<BlogDetails />} /> */}
          {/* <Route path="/service/:id" element={<ServiceDetails />} /> */}
        </Routes>
        <Footer />
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;