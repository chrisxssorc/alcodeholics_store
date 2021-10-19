import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { logoutUser } from '../api/index';
import { Button } from '@mui/material';

const Navbar = ({user, setUser}) => {
    const history = useHistory();
    return (
        <div className="Nav">
            {user
            ? <h3>Welcome Back, {user.user.username}!</h3>
            : ''
            }

            <Link to="/">
                <Button variant="contained">Our Products</Button>
            </Link>

            {user
            ? <Button variant="contained" onClick={() => {
                logoutUser();
                setUser(null);
                history.push("/registerUserAccount");
            }}>Log Out</Button>
            : <Link to="/loginUserAccount">
                <Button variant="contained">Log In</Button>
            </Link>
            }

            <Link to="/cart">
                <Button variant="contained">Cart</Button>
            </Link>

            {user && user.user.isAdmin
            ? <Link to="/users">
                <Button variant="contained">User List</Button>
            </Link>
            : ""
            }
        </div>
    );
}

export default Navbar;