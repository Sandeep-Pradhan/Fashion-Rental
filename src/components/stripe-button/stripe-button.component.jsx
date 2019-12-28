import "./stripe-button.scss";

import { clearCart } from "../../redux/cart/cart.actions";
import { clearDates } from "../../redux/dates/dates.actions";
import { connect } from "react-redux";
import { firestore } from "../../firebase/firebase.utils";

import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price, dispatch, selectDates, cartItems }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_gqY19eAhbdA4Eky4gYcHlHo800mNu6nNMF";
  const onToken = async token => {
    alert("Payment Successful");
    dispatch(clearCart());
    const collectionRef = await firestore.collection("collections").get();
    for (var doc of collectionRef.docs) {
      // collectionRef.docs.map(doc => {
      const { items } = doc.data();
      for (const item of items) {
        if (cartItems.some(itm => itm.id === item.id)) {
          //   console.log(selectDates[item.id]);
          const datesArray = selectDates[item.id].map(dt => dt.toString());
          item.rdates = [...item.rdates, ...datesArray];
        }
      }
      //   console.log(items);
      firestore
        .collection("collections")
        .doc(doc.id)
        .update({
          items: items
        });
    }
    dispatch(clearDates());
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
