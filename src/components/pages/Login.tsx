import React, { useState } from "react";
import { useDispatch } from "react-redux";
import logo from "assets/aircall-logo.png";
import "components/styles/login.css";
import Actions from "actions";

export default function Login() {
    const dispatch = useDispatch();

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(Actions.Auth.Login.request({ username, password }))
    };

    return (
        <div className="login-container">
            <div className="logo-container">
                <img src={logo} alt="aircall logo" className="aircall-logo" />
            </div>

            <div className="right-container">
                <h2>Welcome to Aircall</h2>
                <form className="form-container">
                    <h3>Login</h3>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)} />
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                    <button disabled={!username || !password} className="submit-btn" onClick={handleSubmit}>Login</button>
                </form>
            </div>
        </div>
    )
};