import "./checkout.component.scss";

import {
  selectCartItems,
  selectCartTotalPrice
} from "../../redux/cart/cart.selectors";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import React from "react";
import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
// import ViewDates from "../../components/ViewDates/viewDates.component";

const CheckoutPage = ({ cartItems, totalPrice }) => (
  <div className="checkout-page">
    {/* <ViewDates /> */}
    <div className="checkout-header">
      <div className="header-block">
        <span>Product</span>
      </div>
      <div className="header-block">
        <span>Description</span>
      </div>
      <div className="header-block">
        <span>Select Dates</span>
      </div>
      <div className="header-block">
        <span>Price</span>
      </div>
      <div className="header-block">
        <span>Remove</span>
      </div>
    </div>
    {cartItems.map(cartItem => (
      <CheckoutItem key={cartItem.id} cartItem={cartItem} />
    ))}
    <div className="total-price">TOTAL RENT: Rs.{totalPrice}</div>
    <div className="test-warning">
      *Use the following test credit card for payments*
      <br />
      4242 4242 4242 4242 - Exp: 01/20 - CVV: 123
    </div>
    <StripeCheckoutButton price={totalPrice} />
  </div>
);
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  totalPrice: selectCartTotalPrice
});
export default connect(mapStateToProps)(CheckoutPage);
