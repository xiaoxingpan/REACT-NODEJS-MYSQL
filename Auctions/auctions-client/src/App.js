import React, { useContext } from 'react';
import AddItem from './pages/addItem';
import NavbarComponent from './components/navbar';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import ItemList from './pages/itemList';
import ItemDetailBid from './pages/itemDetailBid';
import UpdateItem from './pages/updateItem';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './helpers/AuthContext';
import { AuthContext } from "./helpers/AuthContext";
import LoginComponent from './components/login';



function App() {
  // const { loginStatus, role } = useContext(AuthContext);
  // const isAdmin = role && role.includes("admin");
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <NavbarComponent />
          <Routes>
            {/* <Route path="/" element={<Home />} />
            <Route path="/itemList" element={<ItemList />} />
            {loginStatus ? (<>
              <Route path="/item/:itemId" element={<ItemDetailBid />} />
              {isAdmin ? (<>
                <Route path="/addItem" element={<AddItem />} />
                <Route path="/updateItem/:itemId" element={<UpdateItem />} /></>) : (<></>)}
            </>) : (<></>)}
            <Route path="/item/:itemId" element={<ItemDetailBid />} />
            <Route path="/addItem" element={<AddItem />} />
            <Route path="/updateItem/:itemId" element={<UpdateItem />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/itemList" element={<ItemList />} />
            <Route path="/item/:itemId" element={<ItemDetailBid />} />
            <Route path="/addItem" element={<AddItem />} />
            <Route path="/updateItem/:itemId" element={<UpdateItem />} />
            <Route path="/item/:itemId" element={<ItemDetailBid />} />
            <Route path="/addItem" element={<AddItem />} />
            <Route path="/updateItem/:itemId" element={<UpdateItem />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;


// FIXME: limit router
// FIXME: message box
// FIXME: store in cookies