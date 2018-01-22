import React, { Component } from 'react';
import { View, Animated, FlatList, Text } from 'react-native';
import { ListItem, Badge, Icon } from 'react-native-elements';
import layoutStyles from './layoutStyles';
import { strings } from '../../locales/i18n';


class Layout extends Component{
    constructor(props){
        super(props);
        this.state = {
            maxHeight  : 0,
            minHeight  : 0,
            itemsCount : 5,
            data       : this.props.data,
            updated    : false,
            title      : this.props.title,          // Title which the layout component inherits from TemplateScreen.
            nofReports : this.props.nofReports,     // Number of reports which the layout component inherits from TemplateScreen.
            templateID : this.props.templateID,     // The specific templateID which the layout component inherits from TemplateScreen.
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

    // Calls the inherited createNew function which is explained in TemplateScreen class.
    createNew = (templateID, isEditable) => {
        this.props.createNew(templateID, isEditable);
    }

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

    badge = (dateAccepted) => {

        /*
        if(JOKU DRAFTEHTO) {
           return (
            <View style={layoutStyles.BadgeViewContainer}>
                 <Badge textStyle = {layoutStyles.badgeTextStyle}
                    containerStyle = {[layoutStyles.badgeContainerStyle, { backgroundColor: '#87cce5' }]}>
                    <Text style={layoutStyles.badgeTextStyle}>{strings('templates.draft')}</Text>
                    <Icon name={'edit-2'} type={'feather'} iconStyle={layoutStyles.badgeIconStyle} />
                </Badge>
            </View>
        );
        }
         */

        if (dateAccepted != null) {
            return (
                <View style={layoutStyles.BadgeViewContainer}>
                    <Badge textStyle = {layoutStyles.badgeTextStyle}
                        containerStyle = {[layoutStyles.badgeContainerStyle, { backgroundColor: '#99d9ad' }]}>
                        <Text style={layoutStyles.badgeTextStyle}>{strings('templates.approved')}</Text>
                        <Icon name={'check'} type={'feather'} iconStyle={layoutStyles.badgeIconStyle} />
                    </Badge>
                    <Text style={layoutStyles.dateAccepted}>{dateAccepted}</Text>
                </View>

            );
        }

        return <View style={layoutStyles.BadgeViewContainer}>
            <Badge textStyle={layoutStyles.badgeTextStyle}
                containerStyle={[layoutStyles.badgeContainerStyle, { backgroundColor: '#f3fe99' }]}>
                <Text style={layoutStyles.badgeTextStyle}>{strings('templates.sent')}</Text>
                <Icon name={'clock'} type={'feather'} iconStyle={layoutStyles.badgeIconStyle}/>
            </Badge>
        </View>;
    };

    render(){
        return (
            <Animated.View
                style={[layoutStyles.animatedContainer,{ height: this.state.animation }]}>
                <View onLayout={this._setMinHeight}>
                    <ListItem
                        containerStyle={ layoutStyles.templateContainer }
                        onPress={this.toggle} // Opens or closes the layout component.
                        title={this.state.title} // Title of the template.
                        //Number of reports as a subtitle
                        subtitle={`${this.state.nofReports} ${(this.state.nofReports === 1) ? strings('templates.report') : strings('templates.reports')}`}
                        rightIcon={{ name: 'note-add', type: 'Materialicons', style: layoutStyles.addReport,  }}
                        leftIcon = { { name: 'folder', type: 'Materialicons', style: layoutStyles.folderIcon, }}
                        onPressRightIcon={() => this.createNew(this.state.templateID, true)} // Navigates to NewReportScreen when pressed.
                        leftIconOnPress={() => this.createNew(this.state.templateID, false)}
                    />
                </View>

                <View style={layoutStyles.reportListContainer} onLayout={this._setMaxHeight}>
                    <FlatList
                        data={ this.state.data.slice(0, this.state.itemsCount) }
                        extraData={ this.state.itemsCount }
                        /* Renders the reports from the state array
                          with the help of an index from the earlier
                          renderItem function. */
                        renderItem={({ item }) =>
                            <ListItem
                                key={item.title}
                                containerStyle={ layoutStyles.reportContainer }
                                title={item.orderNo + '\t' + item.title}
                                subtitle={item.dateCreated}
                                hideChevron = {true}
                                badge ={{ element: this.badge(item.dateAccepted) }}
                            />
                        }
                        keyExtractor={item => item.orderNo}
                        ListFooterComponent={
                            (this.state.data.length > this.state.itemsCount) ?
                                <Text
                                    style={layoutStyles.more}
                                    onPress={() => this.showMore() }
                                >
                                    { strings('templates.showMore') }
                                </Text>
                                :
                                null
                        }
                    />
                </View>
            </Animated.View>
        );
    }
}

export default Layout;
