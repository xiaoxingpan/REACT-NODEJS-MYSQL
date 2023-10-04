import React from 'react';
import AddItem from './pages/addItem';
import NavbarComponent from './components/navbar';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import ItemList from './pages/itemList';
import ItemDetailBid from './pages/itemDetailBid';
import UpdateItem from './pages/updateItem';



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
          <Route path="/itemList" element={<ItemList />} />
          <Route path="/addItem" element={<AddItem />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/item/:itemId" element={<ItemDetailBid />} />
          <Route path="/updateItem/:itemId" element={<UpdateItem />} />
        </Routes>

      </Router>

    </div>
  );
}

export default App;
