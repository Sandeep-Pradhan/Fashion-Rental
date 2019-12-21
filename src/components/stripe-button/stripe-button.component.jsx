import "./stripe-button.scss";

import { clearCart } from "../../redux/cart/cart.actions";
import { connect } from "react-redux";

import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price, dispatch }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_gqY19eAhbdA4Eky4gYcHlHo800mNu6nNMF";
  const onToken = token => {
    alert("Payment Successful");
    dispatch(clearCart());
  };
  return (
    <StripeCheckout
      label="Pay Now"
      name="react-redux-firebase-stripe-graphql-ecommerce"
      billingAddress
      shippingAddress
      image="http://svgshare.com/i/CUz.svg"
      description={`your total is Rs.${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default connect(null)(StripeCheckoutButton);
