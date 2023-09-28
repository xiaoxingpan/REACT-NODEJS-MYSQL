import React, { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';


function App() {

  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [movieReviewList, setMovieList] = useState([]);
  const [newReview, setNewReview] = useState('');

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setMovieList(response.data);
      //console.log(response.data);
    });
  }, []);


  const deleteReview = (movieName) => {
    Axios.delete(`http://localhost:3001/api/delete/${movieName}`);
  };

  const updateReview = (movieName) => {
    Axios.put("http://localhost:3001/api/update", {
      movieName: movieName,
      movieReview: newReview,
    });
    setNewReview("newReview");
  };



  const submitReview = () => {
    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: review,
    });

    setMovieList([...movieReviewList, { movieName: movieName, movieReview: review },
    ]);
    // alert('Sucessfully inserted a record!');

  };

  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>
      <div className='form'>
        <label>Movie Name:</label>
        <input type='text' name='movieName' onChange={(e) => { setMovieName(e.target.value) }} />
        <label>Review:</label>

        <input type='text' name='review' onChange={(e) => { setReview(e.target.value) }} />
        <button onClick={submitReview}>Submit</button>
        {movieReviewList.map((val, index) => {
          return (
            <div className='card' key={index}>
              <h1>{val.movieName} </h1>
              <p>{val.movieReview}</p>

              <button onClick={() => { deleteReview(val.movieName) }}>Delete</button>
              <input type="text" id='updateInput' onChange={(e) => { setNewReview(e.target.value) }} />
              <button onClick={() => { updateReview(val.movieName) }}>Update</button>
            </div>);
        }
        )}
      </div>
    </div >
  );
}

export default App;
