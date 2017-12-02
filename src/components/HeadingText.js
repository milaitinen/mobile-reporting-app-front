import React from "react";
import { Component } from "react";
import { StyleSheet, Text } from "react-native";

import { fonts, scalingFactors } from "./../styles/fonts";
import Dimensions from "Dimensions";
const { width } = Dimensions.get("window");

class HeadingText extends Component {
  static displayName = "HeadingText";

  render() {
    return (
      <Text style={[this.props.style, fonts.big, scaled.big]}>
        {this.props.children}
      </Text>
    );
  }
}

const scaled = StyleSheet.create({
  big: { fontSize: width / scalingFactors.big }
});

export default HeadingText;
