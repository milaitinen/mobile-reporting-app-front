import React, { Component } from 'react';
import { View, Animated, FlatList, Text } from 'react-native';
import { ListItem, Badge } from 'react-native-elements';
import layoutStyles from './layoutStyles';


class Layout extends Component{
    constructor(props){
        super(props);
        this.state = {
            itemsCount : 5,
            data       : this.props.data,
            updated    : false,
            title      : props.title,           // Title which the layout component inherits from TemplateScreen.
            nofReports   : props.nofReports,        // Number of reports which the layout component inherits from TemplateScreen.
            templateID   : props.templateID,        // The specific templateID which the layout component inherits from TemplateScreen.
            expanded   : false,                 // Checks whether the reports of the template are shown or not.
            animation  : new Animated.Value(60), /* Initializes the animation state as 50 (same height as the ListItem
                                                   component which includes the title of the Layout etc.)
                                                   This is the minimum height when the layout component isn't expanded. */
        };
    }

    updateHeight( more = false) {
        const
            finalValue = this.state.expanded && !more ? this.state.minHeight : this.state.maxHeight;

        Animated.spring(
            this.state.animation,
            {
                toValue: finalValue,
                bounciness: 1
            }
        ).start();
    }

    toggleExpanded() {
        this.setState({
            expanded : !this.state.expanded
        });
    }
    // Toggle function for closing and expanding the layout component.


    toggle(){
        this.toggleExpanded();
        this.updateHeight();
    }

    // Sets maximum height when opened.
    _setMaxHeight(event){
        this.setState({
            maxHeight   : event.nativeEvent.layout.height + 60
        });
    }

    // Sets minimum height when closed.
    _setMinHeight(event){
        this.setState({
            minHeight   : event.nativeEvent.layout.height
        });
    }


    // Calls the inherited createNew function which is explained in TemplateScreen class.
    createNew(templateID) {
        this.props.createNew(templateID);
    }

    showMore() {
        this.setState(
            {
                itemsCount: (this.state.itemsCount + 5),
                updated: true,
                maxHeight: this.state.maxHeight + 300
            },
            () => {
                this.updateHeight(true);
            }
        );
    }

    badge = (dateAccepted) => {
        if (dateAccepted != null){
            return <Badge textStyle = {layoutStyles.badgeTextStyle}
                containerStyle = {layoutStyles.badgeContainerStyleA}
                value={'Approved'}
            />;
        }
        return <Badge textStyle = {layoutStyles.badgeTextStyle}
            containerStyle = {layoutStyles.badgeContainerStyleP}
            value={' Pending  '}
        />;
    };

    render(){
        /* Renders the layout componenet and its children, which are defined in the TemplateScreen class.
           The TemplateScreen uses FlatList component as the layout components child.
         */

        return (
            <Animated.View
                style={[layoutStyles.animatedContainer,{ height: this.state.animation }]}>
                <View onLayout={this._setMinHeight.bind(this)}>
                    <ListItem
                        containerStyle={ layoutStyles.templateContainer }
                        onPress={this.toggle.bind(this)} // Opens or closes the layout component.
                        title={this.state.title} // Title of the template.
                        subtitle={this.state.nofReports + ' Reports'} // Number of reports as a subtitle.
                        rightIcon={{ name: 'note-add', type: 'Materialicons', style: layoutStyles.addReport,  }}
                        leftIcon = { { name: 'folder', type: 'Materialicons', style: layoutStyles.folderIcon, }}
                        onPressRightIcon={() => this.createNew(this.state.templateID)} /* Navigates to NewReportScreen when
                                                                                        pressed.*/
                    />

                </View>

                <View style={layoutStyles.reportListContainer} onLayout={this._setMaxHeight.bind(this)}>
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
                                title={item.title}
                                subtitle={item.dateCreated}
                                hideChevron={true}
                                badge = {{ element: this.badge(item.dateAccepted) }}
                            />
                        }
                        keyExtractor={item => item.orderNo}
                        ListFooterComponent={
                            (this.state.data.length > this.state.itemsCount) ?
                                <Text
                                    style={layoutStyles.more}
                                    onPress={() => this.showMore() }
                                >
                                    Show more
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
