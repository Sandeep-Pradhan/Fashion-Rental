import "./checkout-item.component.scss";

import {
  addCartItem,
  clearItemFromCart,
  removeItem
} from "../../redux/cart/cart.actions";

import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
  const { id, name, imageUrl, price, quantity } = cartItem;
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt="item" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        {/* <span className="value">{quantity}</span> */}
        {/* <button className="value">Select Dates</button> */}
        <Link to={`/dates/${id}/`} className="link">
          Select Dates
        </Link>
      </span>

      <span className="price">
        Rs.{price} X {quantity}
      </span>
      <div className="remove-button" onClick={() => clearItem(cartItem)}>
        &#10005;
      </div>
    </div>
  );
};
const mapDispatchToProps = dispatch => ({
  clearItem: item => dispatch(clearItemFromCart(item)),
  addItem: item => dispatch(addCartItem(item)),
  removeItem: item => dispatch(removeItem(item))
});
export default connect(
  null,
  mapDispatchToProps
)(CheckoutItem);
