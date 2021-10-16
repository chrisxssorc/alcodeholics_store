import React, { useState } from 'react';
import { BrowserRouter as Router,
    Route,
    Switch } from 'react-router-dom';

import Navbar from './Navbar';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Users from './Users';
import Alcohols from './Alcohols';
import Cart from './Cart';
import PaymentForm from './PaymentForm';
import ThankYouPage from './ThankYouPage';

const App = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("data")));
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);
    const [alcohols, setAlcohols] = useState([]);

    return (
        <Router>
            <Switch>
                <div className='App'>
                    <Navbar
                        user = {user}
                        setUser = {setUser}
                    />
                    <Route exact path="/">
                        <Alcohols
                            alcohols = {alcohols}
                            setAlcohols = {setAlcohols}
                            user = {user}
                        />
                    </Route>
                    <Route exact path="/registerUserAccount">
                        <RegisterForm
                            username = {username}
                            setUsername = {setUsername}
                            password = {password}
                            setPassword = {setPassword}
                            setUser = {setUser}
                        />
                    </Route>
                    <Route exact path="/loginUserAccount">
                        <LoginForm
                            username = {username}
                            setUsername = {setUsername}
                            password = {password}
                            setPassword = {setPassword}
                            setUser = {setUser}
                        />
                    </Route>
                    <Route exact path="/cart">
                        <Cart
                            user = {user}
                        />
                    </Route>
                    <Route exact path="/users">
                        <Users
                            users = {users}
                            setUsers = {setUsers}
                        />
                    </Route>
                    <Route exact path="/paymentform">
                        <PaymentForm />
                    </Route>
                    <Route exact path="/thankyoupage">
                        <ThankYouPage />
                    </Route>
                </div>
            </Switch>
        </Router>
    );
}

export default App;