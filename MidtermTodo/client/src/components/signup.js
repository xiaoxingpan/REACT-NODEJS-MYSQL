
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup from 'yup';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function SignupComponent() {

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [emailExists, setEmailExists] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/users").then((response) => {
            var email = response.data.map((user) => user.email);
            setEmailExists(email);
        })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const validationSchema = Yup.object().shape({
        password: Yup
            .string()
            .min(6, 'Password must be at least 2 characters')
            .max(50, 'Password must not exceed 100 characters')
            .required('Password is required'),
        email: Yup
            .string()
            .email('Invalid email format')
            .test('unique-email', 'Email already exists', (value) => {
                // Check if the username exists in itemNameExists
                return !emailExists.includes(value);
            })
            .required('Email is required'),
    });

    const addUser = () => {
        validationSchema
            .validate(
                {
                    password,
                    email,
                },
                { abortEarly: false } // Collect all validation errors, not just the first one
            )
            .then(() => {
                Axios.post("http://localhost:3001/users", {
                    password,
                    email,
                })
                    .then((response) => {
                        // Handle the response if needed
                        console.log(response.data);
                        alert("Sucessfully register!")
                    })
                    .catch((error) => {
                        // Handle errors
                        console.error(error);
                    });
            })
            .catch((validationErrors) => {
                // Validation failed; handle the errors
                alert(validationErrors.errors);
            });
    };

    return (
        <div className="form-signup w-50 m-auto">
            <Container>
                <Form>
                    <h1 className="h3 my-5 fw-normal">Please Register</h1>

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label className="text-left">Email:</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                        <Form.Text className="text-muted">
                            Required, please provide a valid email.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label className="text-left">Password:</Form.Label>
                        <Form.Control
                            type="password" // hide the password
                            placeholder="Enter password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                        <Form.Text className="text-muted">
                            Required, 6-100 characters, at least one uppercase letter, one lowercase letter, one number or special character.
                        </Form.Text>
                    </Form.Group>

                    <Button onClick={addUser}>Register</Button>

                </Form>
            </Container>
        </div>
    )
}

export default SignupComponent;