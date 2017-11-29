import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import DeckModel from "../../data/Form";
import Button from "./../Button";
import NormalText from "./../NormalText";
import colors from "./../../styles/colors";

class MockForm extends Component {
  static displayName = "MockForm";

  _review = () => {
    console.warn("Not implemented");
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

        <Button style={styles.editButton} onPress={this._addFields}>
          <NormalText>+</NormalText>
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
  deckButton: { margin: 0, flex: 1 },
  editButton: {
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 0,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 0,
    flex: 0
  }
});

export default MockForm;
