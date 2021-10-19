import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { registerUser } from '../api';
import { TextField, Button } from '@mui/material';

const RegisterForm = ({setUser}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    return (
        <div className="register">
            <form className="registerForm" 
                onSubmit={async (event) => {
                    event.preventDefault();
                    try {
                        const data = await registerUser(username, password);
                        if (data) {
                            setUser(data);
                            history.push("/");
                        } else {
                            alert("Username already taken. Please try again.");
                        }
                    } catch (error) {console.log(error)}
                }}>
                
                <label>Register a New Account</label>
                <TextField 
                    id="newUsername" 
                    label="Enter new username" 
                    variant="outlined" 
                    onChange={(event) => setUsername(event.target.value)}
                />
                <TextField 
                    id="NewPassword" 
                    label="Enter new password" 
                    variant="outlined" 
                    type="password"
                    onChange={(event) => setPassword(event.target.value)}
                />
                <Button variant="contained" type="submit">Submit</Button>
                <h6>Already have an account? <Link to="/loginUserAccount">Log In Here</Link></h6>
            </form>
        </div>
    )
}

export default RegisterForm;