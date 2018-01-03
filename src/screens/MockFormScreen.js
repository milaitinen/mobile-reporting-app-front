import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

const dummyForms = [...new Array(12)].map((e, i) => `MockForm${i + 1}`);


export default class MockForm extends React.Component {
  static displayName = 'MockForm';

  render() {
      return (
          <View>
              <FlatList
                  data={dummyForms}
                  renderItem={({ item }) => <Text style={styles.FlatListItemStyle}>{item}</Text>}
                  keyExtractor={(item, index) => index}
              />
          </View>
      );
  }
}

const styles = StyleSheet.create({
    FlatListItemStyle: {
        padding: 10,
        fontSize: 15,
        height: 44
    }
});