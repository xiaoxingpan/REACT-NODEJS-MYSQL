
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup from 'yup';
import { Container, Form, Button, } from 'react-bootstrap';


function SignupComponent() {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [userNameExists, setUserNameExists] = useState([]);
    const [emailExists, setEmailExists] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/users").then((response) => {
            var userName = response.data.map((user) => user.userName);
            setUserNameExists(userName);
            var email = response.data.map((user) => user.email);
            setEmailExists(email);
        })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const validationSchema = Yup.object().shape({
        userName: Yup
            .string()
            .min(4, 'User name must be at least 2 characters')
            .max(20, 'User name must not exceed 20 characters')
            .matches(/^[a-z0-9]+$/, 'Must contain only lowercase letters and numbers')
            .test('unique-username', 'User name already exists', (value) => {
                // Check if the username exists
                return !userNameExists.includes(value);
            })
            .required('User name is required'),
        password: Yup
            .string()
            .min(4, 'Password must be at least 2 characters')
            .max(100, 'Password must not exceed 100 characters')
            .matches(/[a-z]/, 'Must contain at least one lowercase letter')
            .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
            .matches(/[0-9!@#$%^&*(),.?":{}|<>]/, 'Must contain at least one number or special character')
            .required('Password is required'),
        email: Yup
            .string()
            .email('Invalid email format')
            .test('unique-email', 'Email already exists', (value) => {
                // Check if the username exists in itemNameExists
                return !emailExists.includes(value);
            })
            .required('Seller email is required'),
    });

    const addUser = () => {
        validationSchema
            .validate(
                {
                    userName,
                    password,
                    email,
                },
                { abortEarly: false } // Collect all validation errors, not just the first one
            )
            .then(() => {
                Axios.post("http://localhost:3001/users", {
                    userName,
                    password,
                    email,
                    "role": "user",
                })
                    .then((response) => {
                        // Handle the response if needed
                        console.log(response.data);
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
                    <h1 className="h3 my-5 fw-normal">Please Register to Bid</h1>
                    <Form.Group className="mb-3" controlId="formUserName">
                        <Form.Label className="text-left">Username:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            name="userName"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)} />
                        <Form.Text className="text-muted">
                            Required, 4-20 characters, contains only numbers and lowercase letters.
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

                    <Button onClick={addUser}>Register</Button>

                </Form>
            </Container>
        </div>

    )
}

export default SignupComponent;

// use formik
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// function SignupComponent() {

//     const initialValues = {
//         userName: "",
//         password: "",
//         email: "",
//     }

//     const validationSchema = Yup.object().shape({
//         userName: Yup.string().min(4).max(20).required(),
//         password: Yup.string().min(4).max(100).required(),
//         email: Yup.string().email().required(),
//     });

//     const onSubmit = (data) => {
//         console.log(data);
//     }
//     return (
//         <div className='form-signup'>
//             <Formik initialValues={initialValues}
//                 validationSchema={validationSchema}
//                 onSubmit={onSubmit}>
//                 <Form className="createUserFormContainer">
//                     <label>Username:</label>
//                     <ErrorMessage name="userName" component="span" />
//                     <Field
//                         id="inputUser"
//                         name="userName"
//                         placeholder="Enter username"
//                     />
//                     <br />
//                     <label>Password:</label>
//                     <ErrorMessage name="password" component="span" />
//                     <Field
//                         id="inputUser"
//                         name="password"
//                         type="password"
//                         placeholder="Enter password"
//                     />
//                     <br />

//                     <label>Email:</label>
//                     <ErrorMessage name="email" component="span" />
//                     <Field
//                         id="inputUser"
//                         name="email"
//                         type='email'
//                         placeholder="Enter email"
//                     />
//                     <br />
//                     <button type='submit'>Register</button>
//                 </Form>

//             </Formik>
//         </div>
//     )
// }