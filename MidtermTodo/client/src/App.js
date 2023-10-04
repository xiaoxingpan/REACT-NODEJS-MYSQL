import React from 'react';
import AddTodo from './pages/addTodo';
import UpdateTodo from './pages/updateTodo';
import NavbarComponent from './components/navbar';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import TodoList from './pages/todoList';
import DeleteTodo from './pages/deleteTodo';
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
          <Route path="/todoList" element={<TodoList />} />
          <Route path="/addTodo" element={<AddTodo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/updateTodo/:id" element={<UpdateTodo />} />
          <Route path="/deleteTodo/:id" element={<DeleteTodo />} />


        </Routes>

      </Router>

    </div>
  );
}

export default App;
