import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import { CreateFormButton, EnterForm } from "./MockDeckCreationFields";

class FormCreation extends Component {
  constructor(props) {
    super(props);
    this.state = { showingNameField: false };
  }

  _newDeck = name => {
    console.warn("Not implemented");
    this.setState({ showingNameField: false });
  };

  _showField = () => {
    this.setState({ showingNameField: true });
  };

  render() {
    let contents = this.state.showingNameField
      ? <EnterForm create={this._newDeck} />
      : <CreateFormButton onPress={this._showField} />;
    return contents;
  }
}

export default FormCreation;
