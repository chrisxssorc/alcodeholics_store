import React from 'react';
import { useHistory } from 'react-router-dom';

const Cart = () => {
    const history = useHistory();
    return (
        <div>
            <button onClick={() => {
                history.push("/paymentform");
            }}>Confirm Checkout</button>
        </div>
    )
}

export default Cart;