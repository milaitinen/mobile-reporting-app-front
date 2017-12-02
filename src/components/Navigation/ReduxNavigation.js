import * as ReactNavigation from "react-navigation";
import React from "react";
import { AppNavigation } from "react-native";
import { connect } from "react-redux";

// here is our redux-aware our smart component
function ReduxNavigation (props) {
  const { dispatch, nav } = props;
  const navigation = ReactNavigation.addNavigationHelpers({
    dispatch,
    state: nav
  });

  return <AppNavigation navigation={navigation} />;
}

const mapStateToProps = state => ({ nav: state.nav });
export default connect(mapStateToProps)(ReduxNavigation);