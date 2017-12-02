import React from "React";
import { Component, View, HeadingText } from "react";

import styles from "./styles";

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
