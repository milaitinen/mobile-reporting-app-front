import {
    Button,
    View,
    StyleSheet,
    Text,
    FlatList
} from 'react-native';

import React from "react";

export default class TemplateView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: '#CED0CE',
                    //marginLeft: '14%',
                }}
            />
        );
    };

    render() {

        return (
            <View style={[styles.container]}>
                <FlatList
                    data={[
                        {key: 1, name: 'FormsFromBackendServer'},
                        {key: 2, name: 'Academic'},
                        {key: 3, name: 'Business'},
                        {key: 4, name: 'Bibliography'},
                        {key: 5, name: 'Marketing'},
                        {key: 6, name: 'Newsletter'},
                        {key: 7, name: 'Thesis'},
                        {key: 8, name: 'Calendar'},
                        {key: 9, name: 'Planning'},
                        {key: 10, name: 'Cover Letter'},
                        {key: 11, name: 'Example1'},
                        {key: 12, name: 'Example2'},
                        {key: 13, name: 'Example3'},
                    ]}
                    renderItem={({item}) =>
                        <Text
                            style={styles.item}
                            onPress={() => this.props.navigation.navigate(item.name)} >
                        {item.name}
                        </Text>
                    }
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        padding: 10,
        fontSize: 18,
        height: 60,
    },

    container: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center'
    }
});
