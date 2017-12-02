import React from "react";
import { StyleSheet, Alert, View, Button } from "react-native";

class MockForm extends React.Component {
  static displayName = "MockForm";

  _review = () => {
    Alert.alert("Not implemented");
  };

  _addFields = () => {
    // eslint-disable-next-line no-console
    console.warn("Not implemented");
  };

  render() {
    return (
      <View style={styles.deckGroup}>
        <Button
          style={styles.deckButton}
          onPress={this._review}
          title={`${this.props.deck.name}, ID: ${this.props.deck.formID}`}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deckGroup: {
    flexDirection: "row",
    alignItems: "stretch",
    marginBottom: 1,
    borderColor: "black"
  },
  deckButton: { margin: 0, flex: 1 }
});

export default MockForm;
