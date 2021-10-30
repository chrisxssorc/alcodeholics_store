import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';

const ThankYouPage = () => {
    const history = useHistory();

    return (
        <div className="thankYouPage">
            <h1>Thank you for your purchase!</h1>
            <h3>Your payment has been accepted and your order will be shipped shortly.</h3>
            <h3>Feel free to continue browsing our selection or exit the page.</h3>
            <Button variant="contained" color="success" onClick={() => {
                history.push("/");
            }}>
                Continue Shopping
            </Button>
        </div>
    )
}

export default ThankYouPage;