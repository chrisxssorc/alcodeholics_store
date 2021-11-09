import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
import {
    getPendingItemsByUser,
    removeFromCart,
    changeQuantity
} from '../api/index';

const Cart = ({user}) => {
    const history = useHistory();
    const [cartItems, setCartItems] = useState([]);
    let total = 0;

    useEffect(() => {
        if (user) {
            getPendingItemsByUser(user.user.id)
            .then((cartItems) => {
                setCartItems(cartItems);
            })
            .catch(console.error)
        }
    }, []);

    if (!user) {
        return (
            <div id="loginPrompt">
                <h1>
                    Please <Link to="/loginUserAccount">Login</Link> or <Link to="/registerUserAccount">Register</Link> to see your cart!
                </h1>
            </div>
        )
    } else {
        cartItems.forEach(item => {
            total = parseFloat((Math.round(((item.price * item.quantity) + total) * 100) / 100).toFixed(2))
        })

        return (
            <div id="cart">
              <h1>Your Cart</h1>
              {cartItems.map((item, index) => {
                return (
                  <div className="cartItem" key={index}>
                    <div id="cartItemName">{item.name}</div>

                    <div id="cartItemDetails">
                    <label for="item">Quantity:</label>
      
                    <select
                      name="item"
                      id="item"
                      onChange={(event) => {
                        changeQuantity(item.id, event.target.value);
                        window.location.reload();
                      }}
                    >
                      <option id="selected" selected>{item.quantity}</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
      
                    <div>
                      ${(Math.round(item.price * item.quantity * 100) / 100).toFixed(2)}
                    </div>
      
                    <button
                      onClick={() => {
                        removeFromCart(user.user.id, item.id);
                        window.location.reload();
                      }}
                    >
                      Delete
                    </button>
                    </div>
                  </div>
                );
              })}
              <div id="total">TOTAL: ${total}</div>
              {total === 0 ? (
                <Button variant="contained" color="warning" sx={{width: "10vw", margin: "auto", marginTop: "3vh", marginRight: "0"}}>
                  Checkout
                </Button>
              ) : (
                <Button variant="contained" color="warning" sx={{width: "10vw", margin: "auto", marginTop: "3vh", marginRight: "0"}}
                  onClick={() => {
                    history.push("/paymentform");
                  }}>
                  Checkout
                </Button>
                
              )}
            </div>
          );
    }
}

export default Cart;