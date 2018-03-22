import React, { Component } from 'react';
import { View, Animated, FlatList, Text, Dimensions, Platform, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';

import styles from './styles';
import { strings } from '../../locales/i18n';
import { RightButton } from '../RightButton';
import { StatusBadge } from '../StatusBadge';

class Layout extends Component{
    constructor(props){
        super(props);

        this.state = {
            maxHeight  : 475,
            minHeight  : Dimensions.get('window').width < 350 ? 50 : 60,
            itemsCount : 20,
            updated    : false,
            expanded   : false,  // Checks whether the reports of the template are shown or not.
            animation  : new Animated.Value(Dimensions.get('window').width < 350 ? 50 : 60),
            /* Initializes the animation state as 60 (same height as the ListItem
            component which includes the title of the Layout etc.)
            This is the minimum height when the layout component isn't expanded. */
        };
    }

    // Animates the dropdown to the given position.
    animateDropdownTo = (finalValue) => {
        Animated.timing(
            this.state.animation, { toValue: finalValue, duration: 500 }
        ).start();
    };


    toggleExpanded = () => {
        this.setState({ expanded: !this.state.expanded });
    };

    // Toggle function for closing and expanding the layout component.
    toggle = () => {
        if (this.state.expanded) {
            this.toggleExpanded();
            this.setTemplateScreenRenderFooter(false);
            this.setTemplateScreenScrollEnabled(true);

            setTimeout(() => {
                this.animateDropdownTo(this.state.minHeight);
            },
            0
            );
        } else {
            this.toggleExpanded();
            this.setTemplateScreenRenderFooter(true);
            this.setTemplateScreenScrollEnabled(false);

            setTimeout(() => {
                this.moveToTop();
            },
            0
            );

            setTimeout(() => {
                this.animateDropdownTo(this.state.maxHeight);
            },
            100
            );
        }
    };

    // Autoscroll the template screen so that this template is in the top.
    moveToTop = () => {
        this.props.moveToTop();
    };

    // Determine whether the template screen is scrollable or not.
    setTemplateScreenScrollEnabled = (bool) => {
        this.props.setTemplateScreenScrollEnabled(bool);
    };

    /*
    Determine whether empty space is rendered after the last template of template screen.
    Without this function it wouldn't be possible to autoscroll to the last templates of the template screen.
     */
    setTemplateScreenRenderFooter = (bool) => {
        this.props.setTemplateScreenRenderFooter(bool);
    };


    // Sets maximum height when opened.
    _setMaxHeight = () => {
        const height = Dimensions.get('window').height;

        this.setState({ maxHeight: (Platform.OS === 'ios') ? height - 142 : height - 165 });
    };

    // Shows more reports.
    showMore = () => {
        this.setState(
            {
                itemsCount: (this.state.itemsCount + 20),
                updated: true,
            }
        );
    };

    render(){
        // simplifies referencing (instead of this.props.title, title is enough)
        const { title, nofReports, nofDrafts, templateID, data } = this.props;
        return (
            <Animated.View
                style={[styles.animatedContainer,{ height: this.state.animation }]}>
                <View /*onLayout={this._setMinHeight}*/>
                    <ListItem
                        containerStyle={ styles.templateContainer }
                        onPress={this.toggle} // Opens or closes the layout component.
                        title={title} // Title of the template.
                        titleStyle = { styles.templateTitle }
                        //Number of reports as a subtitle
                        subtitle={
                            <View style={ styles.subtitle }><Text>{nofReports} {(nofReports === 1) ? strings('templates.report') : strings('templates.reports')}</Text>
                                <Text>{nofDrafts} {(nofDrafts === 1) ? strings('templates.draft') : strings('templates.drafts')}</Text></View>}
                        hideChevron={true}
                        badge={{ element: <RightButton
                            onPressNew={() => this.props.createNew(templateID, true)}
                            onPressPrev={() => this.props.createNew(templateID, false)}/> }} /*Navigates to NewReportScreen when pressed.*/
                        leftIcon = { { name: 'assignment', type: 'Materialicons', style: styles.folderIcon, }}
                        //folder, assignment
                    />
                </View>

                <View style={styles.reportListContainer} onLayout={this._setMaxHeight}>
                    <ScrollView style={{ height: this.state.maxHeight - this.state.minHeight }}>
                        <FlatList
                            data={ (data === undefined) ? data : data.slice(0, this.state.itemsCount) }
                            extraData={ this.state.itemsCount }
                            /* Renders the reports from the state array
                              with the help of an index from the earlier
                              renderItem function. */
                            renderItem={({ item }) =>
                                <ListItem
                                    key={item.title}
                                    onPress={() => this.props.viewReport(templateID, item.report_id, item.title)}
                                    containerStyle={ styles.reportContainer }
                                    titleStyle = { styles.reportTitle }
                                    title={(item.orderNo) ? `${item.orderNo}\t${item.title}` : `${item.title}`}
                                    subtitle={item.date_created}
                                    hideChevron = {true}
                                    badge ={{ element:
                                        <StatusBadge
                                            dateAccepted={item.date_accepted}
                                            isDraft={item.report_id < 0}
                                        />
                                    }}
                                />
                            }
                            keyExtractor={item => item.report_id}
                            ListFooterComponent={
                                (data !== undefined && data.length > this.state.itemsCount)
                                    ?
                                    <Text style={styles.more} onPress={() => this.showMore()}>
                                        { strings('templates.showMore') }
                                    </Text>
                                    :
                                    <Text style={styles.noMoreReports}>
                                        { strings('templates.endOfReports') }
                                    </Text>
                            }
                        />
                    </ScrollView>
                </View>
            </Animated.View>
        );
    }
}

export default Layout;

