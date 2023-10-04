import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';



function DeleteTodoComponent() {
    let { id } = useParams();

    const navigate = useNavigate();
    const navigateToTodoList = () => {
        navigate('/todoList');
    }

    useEffect(() => {
        Axios.delete(`http://localhost:3001/todos/${id}`).then((response) => {
            alert("Sucessfully deleted!");
            navigateToTodoList();

        })
            .catch((error) => {
                console.error(error);
            });
    }, []);



    return (
        <div>
            Deleteing...

        </div>
    )
}

export default DeleteTodoComponent;