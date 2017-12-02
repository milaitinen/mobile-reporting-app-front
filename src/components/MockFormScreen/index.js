import React from "react";
import { Component } from "react";
import { View } from "react-native";
import { MockForms } from "./../../data/Mocks";
import Deck from "./MockForm";

class FormScreen extends Component {
  static displayName = "FormScreen";

  constructor(props) {
    super(props);
    this.state = { decks: MockForms };
  }

  _mkDeckViews() {
    if (!this.state.decks) {
      return null;
    }

    return this.state.decks.map(deck => {
      return <Deck deck={deck} key={deck.formID} />;
    });
  }

  render() {
    return (
      <View>
        {this._mkDeckViews()}
      </View>
    );
  }
}

export default FormScreen;
