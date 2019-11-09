import "./cart-item.component.scss";

import React from "react";

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
  <div className="cart-item">
    <img src={imageUrl} alt="" />
    <div className="item-details">
      <span className="name">{name}</span>
      <span className="price">
        {/* {quantity} x Rs.{price} */}
        Rs.{price} / day
      </span>
    </div>
  </div>
);

export default CartItem;
