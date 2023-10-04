import React, { useEffect, useState } from "react";
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Container, Row, Table, Button, } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function TodoListComponent() {
    const [todoList, setTodoList] = useState([]);
    let userId = localStorage.getItem("userId");
    const navigate = useNavigate();

    const navigateToAddTodo = () => {
        navigate('/addTodo');
    }
    const navigateToUpdate = (id) => {
        navigate(`/updateTodo/${id}`);
    }

    const deleteOneTodo = (id) => {
        // Show a confirmation dialog
        const confirmDelete = window.confirm("Are you sure you want to delete this todo item?");

        if (confirmDelete) {
            Axios.delete(`http://localhost:3001/todos/${id}`).then((response) => {
                alert("Successfully deleted!");
                window.location.reload();
            })
                .catch((error) => {
                    console.error(error);
                });
        }
    };



    useEffect(() => {
        Axios.get(`http://localhost:3001/todos/user/${userId}`).then((response) => {
            setTodoList(response.data);
        })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div className="AuctionList my-4">
            <Container>
                <Button variant="info" className="my-5" onClick={navigateToAddTodo}>Add Todo</Button>
                <Row className="justify-content-md-center">
                    <Table bordered hover>
                        <thead className="text-center">
                            <tr>
                                <th>id</th>
                                <th>task</th>
                                <th>dueDate</th>
                                <th>idDone?</th>
                                <th>Operation</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {todoList.map((val, index) => (
                                <tr key={index}>
                                    <td>{val.id}</td>
                                    <td>{val.task}</td>
                                    <td>{val.dueDate}</td>
                                    <td>{val.isDone === 0 ? "Pending" : "Done"}</td>
                                    <td className="text-center">
                                        <i className="bi bi-pencil-square" onClick={() => navigateToUpdate(val.id)}></i> || <i className
                                            ="bi bi-trash3-fill" onClick={() => deleteOneTodo(val.id)}></i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </div>
    )
}
export default TodoListComponent;

// FIXME:pagination