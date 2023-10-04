import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';


export default AddTodoComponent;

function AddTodoComponent() {

    const navigate = useNavigate();
    const navigateToTodoList = () => {
        navigate('/todoList');
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

    const addTodo = () => {
        let userId = localStorage.getItem("userId");
        //setOwnerId(localStorage.getItem("userId"));
        console.log(userId);

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
                            accessToken: sessionStorage.getItem("accessToken"),
                        },
                    }
                )
                    .then((response) => {
                        if (response.data.error) {
                            alert(response.data.error);
                        }
                        // Handle the response if needed
                        console.log(response.data);
                        alert("Sucessfully added!");
                        navigateToTodoList();
                    })
                    .catch((error) => {
                        // Handle errors
                        alert(error);
                    })
                    ;
            })
            .catch((validationErrors) => {
                // Validation failed; handle the errors
                alert(validationErrors.errors);
            });
    };

    return (
        <div className='form my-4' >
            <Container>
                <Row>
                    <Form>

                        <Form.Group className="mb-3" controlId="formSellerEmail">
                            <Form.Label className="text-left">Task:</Form.Label>
                            <Form.Control
                                type="text"
                                name="task"
                                value={task}
                                onChange={(e) => setTask(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formLastPrice">
                            <Form.Label className="text-left">End Date:</Form.Label>
                            <Form.Control
                                type="date"
                                name="dueDate"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formItemDescription">
                            <Form.Label className="text-left">isDone:</Form.Label>
                            <Form.Check
                                type="checkbox"
                                name="isDone"
                                checked={isDone === 1}
                                onChange={() => {
                                    setIsDone(isDone === 0 ? 1 : 0);
                                }}
                            />
                        </Form.Group>

                        <Button onClick={addTodo}>Submit</Button>
                        <Button className='mx-5' variant='warning' onClick={navigateToTodoList}>Cancel</Button>

                    </Form>
                </Row>
            </Container>
        </div >
    );
}

// FIXME: display error/sucessfully message as modal
