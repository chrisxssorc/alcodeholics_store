import React from 'react';
import { useHistory } from 'react-router-dom';
import { logoutUser } from '../api/index';

const Navbar = ({user, setUser}) => {
    const history = useHistory();
    return (
        <div className="Nav">
            <div className="headerText">
                <h1 className="title" onClick={() => {
                    history.push("/");
                }}>alCODEholics</h1>
                {user
                ? <h3 className="welcomeBack">Welcome Back, {user.user.username}!</h3>
                : ''
                }
            </div>
            
            <div className="navButtons">
                {user && user.user.isAdmin
                ? <div onClick={() => {
                    history.push("/users");
                }}>User List</div>
                : ""
                }

                <div onClick={() => {
                    history.push("/");
                }}>Our Products</div>

                <div onClick={() => {
                    history.push("cart");
                }}>Cart</div>

                {user
                ? <div onClick={() => {
                    logoutUser();
                    setUser(null);
                    history.push("/loginUserAccount");
                }}>Log Out</div>
                : <div onClick={() => {
                    history.push("/loginUserAccount");
                }}>Log In</div>
                }
            </div>
        </div>
    );
}

export default Navbar;