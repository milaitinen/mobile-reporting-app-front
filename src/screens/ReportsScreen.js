import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    ScrollView,
    FlatList, Platform,
} from 'react-native';

import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'
import Input from "../components/TextInput/Input";

 class ReportsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reports: props.navigation.state.params.reports,
            layoutID: props.navigation.state.params.layoutID,
            title: props.navigation.state.params.title,
        }
    }
    handleButtonPress = () => {
        this.props.navigation.goBack();
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={styles.MainContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            {this.state.title}
                        </Text>
                    </View>
                    <View style={styles.section}>
                        <Icon name={'sort'} color={'gray'} size={14}> A-Z</Icon>
                        <View style={styles.search}>
                            <TextInput
                                underlineColorAndroid={'transparent'}
                                placeholder={''}
                            />
                        </View>
                    </View>

                    <View style={styles.container}>
                        <FlatList
                            style={styles.flatList}
                            data={ this.state.reports }
                            renderItem={({item}) =>
                                <ListItem
                                    key={item.title}
                                    title={item.title}
                                    subtitle={item.dateCreated}
                                    containerStyle={styles.ListItemStyle}
                                />}
                            keyExtractor={item => item.title}
                        />
                    </View>

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        padding: 10,
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    search: {
        marginLeft: 10,
        width: 200,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white',

    },
    textInput: {
        width: 180,
        height: 35,
        alignSelf: 'center',
        marginLeft: 10,
    },
    section: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        margin: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    MainContainer: {
        flex: 1,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    },
    container: {
        backgroundColor: '#fff',
        margin:10,
        overflow:'hidden'
    },
    ListItemStyle: {
        height: 50
    },
});

export default ReportsScreen;