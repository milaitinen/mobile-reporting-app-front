import React, { Component } from "react";
import { View, Image } from "react-native";

import styles from "./styles";
import HeadingText from "./../HeadingText";

class Header extends Component {
  static displayName = "Header";

  render() {
    return (
      <View style={styles.header}>
        <HeadingText>FORMS</HeadingText>
      </View>
    );
  }
}

export default Header;
