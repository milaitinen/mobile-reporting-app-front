import {
    View,
    StyleSheet,
    Text,
    FlatList,
    ScrollView
} from 'react-native';

import React from 'react';

export default class TemplateView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {

        return (
            <View style={[styles.container]}>
                <ScrollView>
                    <FlatList
                        data={[
                            { key: 1, name: 'Workplace survey' },
                            { key: 2, name: 'Customer survey' },
                            { key: 3, name: 'Reclamation survey' },
                            { key: 4, name: 'Customer satisfaction survey' },
                            { key: 5, name: 'Job performance review' },
                            { key: 6, name: 'Employee satisfaction survey' },
                            { key: 7, name: 'Service evaluation' },
                            { key: 8, name: 'Quality survey' },
                            { key: 9, name: 'Staff survey' },
                            { key: 10, name: 'Feedback survey' },
                            { key: 11, name: 'Product survey' },
                            { key: 12, name: 'Medical practive survey' },
                            { key: 13, name: 'Marketing survey' },
                        ]}
                        renderItem={({ item }) =>
                            <Text
                                style={styles.item}
                                onPress={() => this.props.navigation.navigate('Reports')} >
                                {item.name}
                            </Text>
                        }

                    />
                </ScrollView>
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
        // justifyContent: 'center',
        // alignItems: 'center'
    }
});