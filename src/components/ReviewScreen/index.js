import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Alert,
    Platform
} from 'react-native';

import {url} from './urlsetting';

class ReviewScreen extends Component {
    static displayName = 'ReviewScreen';

    constructor(props)
    {
        super(props);
        this.state = { isLoading: true };
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
    renderUserInfo = () => {
        return null;
    };

    render() {
        return (
            <View style={styles.MainContainer}>
              <FlatList data={ this.state.dataSource }
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

const styles = StyleSheet.create({

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
