import React, { Component } from 'react';
import { View, Animated, FlatList, Text } from 'react-native';
import { ListItem } from 'react-native-elements';

import styles from './styles';
import { strings } from '../../locales/i18n';
import { RightButton } from '../RightButton';
import { StatusBadge } from '../StatusBadge';


class Layout extends Component{
    constructor(props){
        super(props);
        this.state = {
            maxHeight  : 0,
            minHeight  : 0,
            itemsCount : 5,
            updated    : false,
            expanded   : false,                     // Checks whether the reports of the template are shown or not.
            animation  : new Animated.Value(60),    /* Initializes the animation state as 50 (same height as the ListItem
                                                    component which includes the title of the Layout etc.)
                                                    This is the minimum height when the layout component isn't expanded. */
        };
    }

    updateHeight = (more = false) => {
        const finalValue = this.state.expanded && !more ? this.state.minHeight : this.state.maxHeight;

        Animated.spring(
            this.state.animation, { toValue: finalValue, bounciness: 1 }
        ).start();
    };

    toggleExpanded = () => {
        this.setState({ expanded : !this.state.expanded });
    };

    // Toggle function for closing and expanding the layout component.
    toggle = () => {
        this.toggleExpanded();
        this.updateHeight();
    };

    // Sets maximum height when opened.
    _setMaxHeight = (event) => {
        this.setState({ maxHeight : event.nativeEvent.layout.height + 60 });
    };

    // Sets minimum height when closed.
    _setMinHeight = (event) => {
        this.setState({ minHeight : event.nativeEvent.layout.height });
    };

    showMore = () => {
        this.setState(
            {
                itemsCount: (this.state.itemsCount + 5),
                updated: true,
                maxHeight: this.state.maxHeight + 300
            },
            () => { this.updateHeight(true); }
        );
    };

    render(){
        // simplifies referencing (instead of this.props.title, title is enough)
        const { title, nofReports, templateID, data } = this.props;
        return (
            <Animated.View
                style={[styles.animatedContainer,{ height: this.state.animation }]}>
                <View onLayout={this._setMinHeight}>
                    <ListItem
                        containerStyle={ styles.templateContainer }
                        onPress={this.toggle} // Opens or closes the layout component.
                        title={title} // Title of the template.
                        //Number of reports as a subtitle
                        subtitle={`${nofReports} ${(nofReports === 1) ? strings('templates.report') : strings('templates.reports')}`}
                        hideChevron={true}
                        badge={{ element: <RightButton
                            onPressNew={() => this.props.createNew(templateID, true)}
                            onPressPrev={() => this.props.createNew(templateID, false)}/> }} /*Navigates to NewReportScreen when pressed.*/
                        leftIcon = { { name: 'assignment', type: 'Materialicons', style: styles.folderIcon, }}
                        //folder, assignment
                    />
                </View>

                <View style={styles.reportListContainer} onLayout={this._setMaxHeight}>
                    <FlatList
                        data={ (data === undefined) ? data : data.slice(0, this.state.itemsCount) }
                        extraData={ this.state.itemsCount }
                        /* Renders the reports from the state array
                          with the help of an index from the earlier
                          renderItem function. */
                        renderItem={({ item }) =>
                            <ListItem
                                key={item.title}
                                containerStyle={ styles.reportContainer }
                                title={`${item.orderNo}\t${item.title}`}
                                subtitle={item.dateCreated}
                                hideChevron = {true}
                                badge ={{ element: <StatusBadge dateAccepted={item.dateAccepted}/> }}
                            />
                        }
                        keyExtractor={item => item.orderNo}
                        ListFooterComponent={
                            (data !== undefined && data.length > this.state.itemsCount)
                                ? <Text style={styles.more} onPress={() => this.showMore()}>
                                    { strings('templates.showMore') }
                                </Text>
                                : null
                        }
                    />
                </View>
            </Animated.View>
        );
    }
}

export default Layout;
