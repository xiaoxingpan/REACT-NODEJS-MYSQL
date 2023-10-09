import React, { useEffect, useState } from "react";
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function IsLoginComponent() {

    Axios.defaults.withCredentials = true;
    const [loginStatus, setLoginStatus] = useState("");
    const [role, setRole] = useState("");


    // everytime fresh the page, got the login info
    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
            if (response.data.loggedIn == true) {
                setLoginStatus(response.data.user['userName']);
                setRole(response.data.user['role']);
                console.log(response.data.user);
                console.log();

            }
        });
    }, [setLoginStatus], [setRole]);

    return (
        <div></div>
    )
}
export default IsLoginComponent;