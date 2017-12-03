import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Alert,
    Platform,
    TextInput,
    Button,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';

import {url} from './urlsetting';

class ReviewScreen extends Component {
    static displayName = 'ReviewScreen';

    constructor(props)
    {
        super(props);
        this.state = {
            isLoading: true,
            TextInputName: ""
        };
    }

    componentDidMount() {

        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson
                }, function() {
                    // In this block you can do something with new state.
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: '#CED0CE'
                }}
            />
        );
    };

    /*static GetFlatListItem(name) {

        Alert.alert(
            name,
            'Hello World!'
        );

    }
*/
  InsertDataToServer = () => {

      const { TextInputName } = this.state ;

      fetch(url, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              name: TextInputName
          })

      }).then(response => {
          if (response.status === 200) {
              return "Report added";
          } else {
              return response.status;
          }
      }).then((message) => {
        // Showing response message coming from server after inserting records.
          Alert.alert(message);

      }).catch((error) => {
          console.error(error);
      });

  }

    renderUserInfo = () => {
        return null;
    };

    render() {

        if (this.state.isLoading) {
            return (
                <View style={[styles.container]}>

                    <ActivityIndicator
                        animating={this.state.animating}
                        style={[styles.centering, {height: 80}]}
                        size='large'
                    />

                </View>
            );
        }

        return (
            <View style={styles.MainContainer}>
                <TextInput
                    placeholder='Enter Report Name'

                    onChangeText={TextInputName => this.setState({TextInputName})}

                    underlineColorAndroid='transparent'

                    style={styles.TextInputStyleClass}
                />

                <TouchableOpacity
                    //title='Create New Report'
                    onPress={this.InsertDataToServer}
                    //color='#2196F3'
                    style={styles.createButton} >

                    <Text>
                        +
                    </Text>
                </TouchableOpacity>

              <FlatList
                  data={ this.state.dataSource }
                  ItemSeparatorComponent = {this.FlatListItemSeparator}
                  renderItem={({item}) =>
                      <Text style={styles.FlatListItemStyle}>
                      > {item.name}
                      </Text>}
                  keyExtractor={(item, index) => index}
              />
            </View>
        );
    }
}

const circle = {
    borderWidth: 0,
    borderRadius: 40,
    width: 80,
    height: 80
};


const styles = StyleSheet.create({

    TextInputStyleClass: {

        textAlign: 'center',
        marginBottom: 7,
        height: 40,
        borderWidth: 1,
// Set border Hex Color Code Here.
        borderColor: '#FF5722',

// Set border Radius.
        //borderRadius: 10 ,
    },

    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    },

    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        //margin: 10,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    },
    FlatListItemStyle: {
        padding: 10,
        fontSize: 15,
        height: 44
    },
    container: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: 'white'
    },
    linkButton: {
        textAlign: 'center',
        color: '#CCCCCC',
        marginBottom: 10,
        padding: 5
    }
});

export default ReviewScreen;
