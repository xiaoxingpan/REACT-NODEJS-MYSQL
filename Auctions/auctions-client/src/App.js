import React from 'react';
import AddAuction from './pages/addAuction';
import NavbarComponent from './components/navbar';
import Home from './pages/home';
// import NewBid from './components/newBid';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <NavbarComponent />

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addAuction" element={<AddAuction />} />
          {/* <Route path="/placeBid" element={newBid} /> */}
        </Routes>

      </Router>

    </div>
  );
}

export default App;
