const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Welcome',
    database: 'react',
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM movie_reviews";
    db.query(sqlSelect, (err, result) => {
        console.log(result);
        res.send(result);
    });
    // test if dababase is working
    // const sqlquery = "INSERT INTO movie_reviews (movieName, movieReview) VALUES ('Harry Potter', 'awesome!');"
    // db.query(sqlquery, (err, result) => {
    //     if (err) {
    //         console.error('Error inserting into the database:', err);
    //         res.status(500).send('Error inserting into the database');
    //     } else {
    //         console.log('Successfully inserted into the database');
    //         res.send('Successfully inserted!');
    //     }
    // });
});

app.post('/api/insert', (req, res) => {

    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?, ?);"
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        if (err) {
            console.error('Error inserting into the database:', err);
            res.status(500).send('Error inserting into the database');
        } else {
            console.log('Successfully inserted into the database');
            res.send('Successfully inserted!');
        }
    });

});


app.delete('/api/delete/:movieName', (req, res) => {

    const movieName = req.params.movieName;

    const sqlDelete = "DELETE FROM movie_reviews WHERE movieName = ?";
    db.query(sqlDelete, movieName, (err, result) => {
        if (err) {
            console.error('Error deleting from the database:', err);
            res.status(500).send('Error deleting from the database');
        } else {
            console.log('Successfully deleted from the database');
            res.send('Successfully deleted!');
        }
    });

});

app.put('/api/update', (req, res) => {

    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?";
    db.query(sqlUpdate, [movieReview, movieName], (err, result) => {
        if (err) {
            console.error('Error updating into the database:', err);
            res.status(500).send('Error updating into the database');
        } else {
            console.log('Successfully deleted into the database');
            res.send('Successfully updated!');
        }
    });

});

app.listen(3001, () => {
    console.log("running on port 3001");
});
