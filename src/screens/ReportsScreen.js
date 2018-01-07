import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    ScrollView,
    FlatList, Platform,
} from 'react-native';

import { ListItem, SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'
import Input from "../components/TextInput/Input";

 class ReportsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reports: props.navigation.state.params.reports,
            layoutID: props.navigation.state.params.layoutID,
            title: props.navigation.state.params.title,
            nofForms: props.navigation.state.params.nofForms,
        }
    }
    handleButtonPress = () => {
        this.props.navigation.goBack();
    };

     createNew = (layoutID) => {
         this.props.navigation.navigate('NewForm', { layoutID: layoutID });
     };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={styles.MainContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            {this.state.title}
                        </Text>
                        <Icon
                            name={'plus'}
                            color={'green'}
                            size={20}
                            onPress={() => this.createNew(this.state.layoutID)}
                        />
                    </View>
                    <View style={styles.section}>
                        <Icon name={'sort'} color={'gray'} size={14}> A-Z</Icon>
                        <SearchBar
                            placeholder={'Search for reports'}
                            lightTheme
                            containerStyle={styles.searchBarContainer}
                            inputStyle={{backgroundColor: '#fff', width: 160,}}

                        />
                        <Text style={{fontWeight: 'bold'}}>
                            {this.state.nofForms + ' Forms'}
                        </Text>
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
        marginRight: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    searchBarContainer: {
        paddingBottom: (Platform.OS === 'ios') ? 20 : 5,
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
        borderTopWidth:0,
        marginLeft: 10,
        marginRight: 20,
        width: 160,
    },
    section: {
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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