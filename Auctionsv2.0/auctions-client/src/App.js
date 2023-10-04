import React from 'react';
import AddAuction from './pages/addAuction';
import NavbarComponent from './components/navbar';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';


// import NewBid from './components/newBid';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">


      <Router>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addAuction" element={<AddAuction />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

        </Routes>

      </Router>

    </div>
  );
}

export default App;
