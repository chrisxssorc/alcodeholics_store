import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { loginUser } from '../api';
import { TextField, Button } from '@mui/material';

const LoginForm = ({setUser}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    return (
        <div className="login">
            <form className="loginForm" 
                onSubmit={async (event) => {
                    event.preventDefault();
                    try {
                        const data = await loginUser(username, password);
                        if (data) {
                            setUser(data);
                            history.push("/");
                        } else {
                            alert("Invalid username or password. Please try again.");
                        }
                    } catch (error) {console.log(error)}
                }}>
                
                <label>Log in to Your Account</label>
                <TextField 
                    id="newUsername" 
                    label="Enter username" 
                    variant="standard"
                    type="string"
                    onChange={(event) => setUsername(event.target.value)}
                />
                <TextField 
                    id="newPassword" 
                    label="Enter password" 
                    variant="standard" 
                    type="password"
                    onChange={(event) => setPassword(event.target.value)}
                />
                <Button variant="contained" type="submit">Submit</Button>
                <h5>Don't have an account? <Link to="/registerUserAccount">Register Here</Link></h5>
            </form>
        </div>
    )
}

export default LoginForm;