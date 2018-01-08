import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    FlatList,
} from 'react-native';

import { ListItem, SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './style/reportsScreenStyle';

class ReportsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reports: props.navigation.state.params.reports,     // The reports inherited from the layout component in TemplateScreen.
            layoutID: props.navigation.state.params.layoutID,   // The specific layoutID inherited from the layout component in TemplateScreen.
            title: props.navigation.state.params.title,         // The title inherited from the layout component in TemplateScreen.
            nofForms: props.navigation.state.params.nofForms,   // The number of forms inherited from the layout component in TemplateScreen.
        };
    }


    /*
     Calls the inherited createNew function which is explained in TemplateScreen class.
     */
    createNew(layoutID) {
        this.props.navigation.state.params.new(layoutID);
    }

    render() {
        /*
         Renders the reports of a template in a FlatList component.
         */

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
                            onPress={() => this.createNew(this.state.layoutID)} // Navigates to NewReportScreen when pressed.
                        />
                    </View>
                    <View style={styles.section}>
                        <Icon name={'sort'} color={'gray'} size={14}> A-Z</Icon>
                        <SearchBar
                            placeholder={'Search for reports'}
                            lightTheme
                            containerStyle={styles.searchBarContainer}
                            inputStyle={{ backgroundColor: '#fff', width: 160, }}

                        />
                        <Text style={{ fontWeight: 'bold' }}>
                            {this.state.nofForms + ' Forms'}
                        </Text>
                    </View>

                    <View style={styles.container}>
                        <FlatList
                            style={styles.flatList}
                            data={ this.state.reports } // The data in which the reports are stored.
                            renderItem={({ item }) =>   // Renders the reports
                                <ListItem
                                    key={item.title}    // Defines the key of the report to be the title.
                                    title={item.title}  // Title of the report
                                    subtitle={item.dateCreated} // The creation date of the report as a subtitle.
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

export default ReportsScreen;