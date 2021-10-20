import React from 'react';
import { useHistory } from 'react-router-dom';

const PaymentForm = () => {
    const history = useHistory();

    return (
        <div id="payform">
            <div className="row">
            <div className="col-75">
                <div className="container">
                <form action="/action_page.php">
                    <div className="row">
                    <div className="col-50">
                        <h3>Billing Address</h3>
                        <label for="fname">
                        <i className="fa fa-user"></i> Full Name
                        </label>
                        <input
                        type="text"
                        id="fname"
                        name="firstname"
                        placeholder="John M. Doe"
                        ></input>
                        <label for="adr">
                        <i className="fa fa-address-card-o"></i> Address
                        </label>
                        <input
                        type="text"
                        id="adr"
                        name="address"
                        placeholder="542 W. 15th Street"
                        ></input>
                        <label for="city">
                        <i className="fa fa-institution"></i> City
                        </label>
                        <input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="New York"
                        ></input>

                        <div className="row">
                        <div className="col-50">
                            <label for="state">State</label>
                            <input
                            type="text"
                            id="state"
                            name="state"
                            placeholder="NY"
                            ></input>
                        </div>
                        <div className="col-50">
                            <label for="zip">Zip</label>
                            <input
                            type="text"
                            id="zip"
                            name="zip"
                            placeholder="10001"
                            ></input>
                        </div>
                        </div>
                    </div>

                    <div className="col-50">
                        <h3>Payment</h3>
                        <label for="cname">Name on Card</label>
                        <input
                        type="text"
                        id="cname"
                        name="cardname"
                        placeholder="John More Doe"
                        ></input>
                        <label for="ccnum">Credit card number</label>
                        <input
                        type="text"
                        id="ccnum"
                        name="cardnumber"
                        placeholder="1111-2222-3333-4444"
                        ></input>
                        <label for="expmonth">Exp Month</label>
                        <input
                        type="text"
                        id="expmonth"
                        name="expmonth"
                        placeholder="September"
                        ></input>

                        <div className="row">
                        <div className="col-50">
                            <label for="expyear">Exp Year</label>
                            <input
                            type="text"
                            id="expyear"
                            name="expyear"
                            placeholder="2018"
                            ></input>
                        </div>
                        <div className="col-50">
                            <label for="cvv">CVV</label>
                            <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            placeholder="352"
                            ></input>
                        </div>
                        </div>
                    </div>
                    </div>
                    <input
                    type="submit"
                    value="Finish Payment"
                    className="paymentbtn"
                    onClick={() => { history.push('/thankyoupage')}}
                    ></input>
                </form>
                </div>
            </div>
        </div>
    </div>
  );
};

export default PaymentForm;