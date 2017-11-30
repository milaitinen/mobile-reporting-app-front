import React, { Component } from "react";
import { StyleSheet, View, Alert } from "react-native";

import Button from "./../Button";
import NormalText from "./../NormalText";

class MockForm extends Component {
  static displayName = "MockForm";

  _review = () => {
      Alert.alert("Not implemented");
  };

  _addFields = () => {
    console.warn("Not implemented");
  };

  render() {
    return (
      <View style={styles.deckGroup}>
        <Button style={styles.deckButton} onPress={this._review}>
          <NormalText>
            {this.props.deck.name}, ID: {this.props.deck.formID}
          </NormalText>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deckGroup: {
    flexDirection: "row",
    alignItems: "stretch",
    marginBottom: 1,
    borderColor: 'black'
  },
  deckButton: { margin: 0, flex: 1 }
});

export default MockForm;
