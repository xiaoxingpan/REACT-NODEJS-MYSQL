import React, { useEffect, useContext } from "react";
import Axios from 'axios';
import AuthContext from '../helpers/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function IsLoginComponent() {

    Axios.defaults.withCredentials = true;
    const { setLoginStatus, setUsername, setRole, setUserId } = useContext(AuthContext);


    // everytime fresh the page, got the login info
    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {

            console.log("=======" + response.data.loggedIn);
            if (response.data.loggedIn == true) {
                // setLoginStatus(true);
                // setUsername(response.data.user['userName']);
                // setRole(response.data.user['role']);
                // setUserId(response.data.user['userId']);
            }
        });
    }, [setLoginStatus, setRole, setUserId, setUsername]);

    return (
        <div></div>
    )


}
export default IsLoginComponent;