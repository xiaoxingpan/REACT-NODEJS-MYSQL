import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { Container, Row, Form, Button, } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';


function UpdateTodoComponent() {

    let { id } = useParams();
    const navigate = useNavigate();
    const navigateToTodoList = () => {
        navigate('/todoList');
    }

    useEffect(() => {
        Axios.get(`http://localhost:3001/todos/${id}`).then((response) => {
            setTodo(response.data);
            console.log(response.data);
        })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const [todo, setTodo] = useState({
        id: '',
        task: '',
        dueDate: '',
        isDone: '',
    });

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 to the month because it's zero-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const [task, setTask] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [isDone, setIsDone] = useState(0);

    const validationSchema = Yup.object().shape({
        task: Yup
            .string()
            .min(1, 'Task must be at least 1 characters')
            .max(100, 'Task must not exceed 100 characters')
            .required('Task is required'),
        dueDate: Yup
            .date()
            .min(new Date(new Date().getTime() + 24 * 60 * 60 * 1000), 'End Date must be tomorrow or later')
            .required('Due date is required'),
    });

    const updateTodo = () => {
        let userId = localStorage.getItem("userId");
        validationSchema
            .validate(
                {
                    task,
                    dueDate,
                },
                { abortEarly: false } // Collect all validation errors, not just the first one
            )
            .then(() => {
                // Validation passed; you can make the Axios POST request here
                Axios.post("http://localhost:3001/todos", {
                    task,
                    dueDate,
                    isDone,
                    "ownerId": userId
                },
                    {
                        headers: {
                            accessToken: localStorage.getItem("accessToken"),
                        },
                    }
                ).then((response) => {
                    if (response.data.error) {
                        alert(response.data.error);
                    }
                    // Handle the response if needed
                    console.log(response.data);
                    alert("Sucessfully updated!");
                    navigateToTodoList();
                })
                    .catch((error) => {
                        alert(error);
                    });
            })
            .catch((validationErrors) => {
                alert(validationErrors.errors);
            });
    };


    return (
        <div className='form my-4' >
            <Container>
                <Row>
                    <Form>
                        <Form.Group className="mb-3" controlId="formSellerEmail">
                            <Form.Label className="text-left">ID:</Form.Label>
                            <Form.Control
                                type="number"
                                name="id"
                                value={todo.id}
                                readOnly />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formSellerEmail">
                            <Form.Label className="text-left">Task:</Form.Label>
                            <Form.Control
                                type="text"
                                name="task"
                                defaultValue={todo.task}
                                onChange={(e) => setTask(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formLastPrice">
                            <Form.Label className="text-left">End Date:</Form.Label>
                            <Form.Control
                                type="date"
                                name="dueDate"
                                defaultValue={formatDate(todo.dueDate)}
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formItemDescription">
                            <Form.Label className="text-left">isDone:</Form.Label>
                            <Form.Check
                                type="checkbox"
                                name="isDone"
                                checked={todo.isDone === 1}
                                onChange={() => {
                                    // Handle the change here, e.g., toggle the value of todo.isDone
                                    // based on the current value
                                    setTodo((prevTodo) => ({
                                        ...prevTodo,
                                        isDone: prevTodo.isDone === 1 ? 0 : 1,
                                    }));
                                }}
                            />
                        </Form.Group>

                        <Button onClick={updateTodo}>Submit</Button>
                        <Button className='mx-5' variant='warning' onClick={navigateToTodoList}>Cancel</Button>

                    </Form>
                </Row>
            </Container>
        </div >
    )
}

export default UpdateTodoComponent;