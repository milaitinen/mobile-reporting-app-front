import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { TabNavigator } from "react-navigation";

import Heading from "./Header";
import MockFormScreen from "./MockFormScreen";
import ReviewScreen from "./ReviewScreen";


var MainScreenNavigator = TabNavigator({
    Forms: {screen: ReviewScreen},
    MockForms: {screen: MockFormScreen}
}, {
    swipeEnabled: true,
    tabBarOptions: {
        labelStyle: {
            fontSize: 16,
            padding: 10
        }
    }
});

MainScreenNavigator.navigationOptions = {
    title: "Tab example"
};

// Root component of the application
class Reportforms extends Component {
  _renderScene() {
    //return <ReviewScreen />;
    //return <NewCardScreen />;

    // renders existing forms
    //return <MockFormScreen />;
  }
  render() {
    return (
      <View style={styles.container}>
        {this._MainScreenNavigator}
      </View>
    );
  }
}

const styles = StyleSheet.create({ container: { flex: 1, marginTop: 30 } });

export default MainScreenNavigator;
