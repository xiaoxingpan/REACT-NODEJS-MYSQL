import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";



function LoginComponent() {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    // const { setAuthState } = useContext(AuthContext);
    const [loginStatus, setLoginStatus] = useState("");
    const navigate = useNavigate();
    const navigateToHome = () => {
        navigate('/');
    }

    const authUser = () => {
        Axios.post("http://localhost:3001/users/auth", {
            userName,
            password,
        })
            .then((response) => {
                console.log(response);
                //FIXME: only show message when successfully login
                if (response.data.error) {
                    alert(response.data.error); // Display the error message
                } else if (response.data.message) {
                    alert(response.data.message); // Display success message or token
                    localStorage.setItem("accessToken", response.data.token);
                    localStorage.setItem('userId', response.data.userId);
                    // setAuthState(true);
                    navigateToHome();
                }
            })
            .catch((error) => {
                // Handle errors
                alert(error); // Display the error message

            });
    };

    return (
        <div className="form-signin w-50 m-auto">
            <Container>
                <Form>
                    <h1 className="h3 my-5 fw-normal">Please Signin</h1>
                    <Form.Group className="mb-3" controlId="formUserName">
                        <Form.Label className="text-left">Username:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            name="userName"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label className="text-left">Password:</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>

                    <Button onClick={authUser}>Login</Button>

                </Form>
            </Container>
        </div>

    )
}

export default LoginComponent;