import "./collection-item.component.scss";

import CustomButton from "../custom-button/custom-button.component";
import React from "react";
import { addCartItem } from "../../redux/cart/cart.actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import ViewDates from "../ViewDates/viewDates.component";

const CollectionItem = ({ item, addCartItem }) => {
  //   console.log(item);
  const { id, name, price, imageUrl, rdates } = item;
  return (
    <div className="collection-item">
      <div className="image" style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className="collection-footer">
        <span className="name"> {name}</span>
        <span className="price">Rent: Rs.{price}/day </span>
      </div>
      {/* <CustomButton
        className="custom-button-1"
        onClick={() => <Link to={`/dates/${id}`}>Edit</Link>}
        inverted
      >
        View Availability
      </CustomButton> */}
      {/* <Link to={`/dates/${id}`} className="custom-button-1">
        View Availability
      </Link> */}
      <Link
        to={{
          pathname: `/dates/${id}/`,
          disdates: rdates
        }}
        style={{
          textDecoration: "none"
        }}
      >
        <CustomButton className="custom-button-1" inverted>
          View Availability
        </CustomButton>
      </Link>

      <CustomButton
        className="custom-button-2"
        onClick={() => addCartItem(item)}
        inverted
      >
        Add to Cart
      </CustomButton>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  addCartItem: item => dispatch(addCartItem(item))
});
export default connect(null, mapDispatchToProps)(CollectionItem);
