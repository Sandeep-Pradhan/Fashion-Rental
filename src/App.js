import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import CheckoutPage from "./pages/checkout/checkout.component";
import { GlobalStyle } from "./global.styles";
import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInSignUpPage from "./pages/sign-in-sign-up/sign-in-sign-up.component";
import { checkUserSession } from "./redux/user/user.actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selector";
import ViewDates from "./components/ViewDates/viewDates.component";

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div>
      <GlobalStyle />
      <Header />
      {/* <ViewDates /> */}
      <Switch>
        <Route exact path="/" component={HomePage} />{" "}
        <Route path="/shop" component={ShopPage} />{" "}
        <Route exact path="/checkout" component={CheckoutPage} />{" "}
        <Route path="/dates/:id" exact component={ViewDates} />{" "}
        <Route
          exact
          path="/signin"
          render={() =>
            currentUser ? <Redirect to="/" /> : <SignInSignUpPage />
          }
        />{" "}
      </Switch>{" "}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});
const mapDispatchToProps = dispatch => ({
  checkUserSession: user => dispatch(checkUserSession())
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
