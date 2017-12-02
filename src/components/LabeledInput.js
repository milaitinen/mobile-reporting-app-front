import React from "react";
import { Component } from "react";
import { View } from "react-native";
import NormalText from "./NormalText";
import { StyleSheet } from "react-native";

class LabeledInput extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <NormalText style={styles.label}>
          {this.props.label}:
        </NormalText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  label: { paddingLeft: 10 },
  wrapper: { padding: 5 }
});

export default LabeledInput;
