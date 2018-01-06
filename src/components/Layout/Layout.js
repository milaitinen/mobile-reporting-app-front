import React, { Component } from 'react';
import { Text, StyleSheet, View, Animated } from 'react-native';
import { ListItem } from 'react-native-elements';



class Layout extends Component{
    constructor(props){
        super(props);
        this.state = {
            title      : props.title,           // Title which the layout inherits from TemplateScreen.
            nofForms   : props.nofForms,        // Number of forms which the layout inherits from TemplateScreen.
            layoutID   : props.layoutID,        // The specific layoutID which the layout inherits from TemplateScreen.
            expanded   : false,                 // Checks whether the forms of the layout are shown or not.
            animation  : new Animated.Value(50) /* Initializes the animation state as 50 (same height as the ListItem
                                                   component which includes the title of the Layout etc.)
                                                   This is the minimum height when the layout isn't expanded. */
        };
    }

    // Toggle function for closing and expanding the layout.

    toggle(){
        const
            initialValue = this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
            finalValue   = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

        this.setState({
            expanded : !this.state.expanded
        });
        // Animation for closing and opening
        this.state.animation.setValue(initialValue);
        Animated.spring(
            this.state.animation,
            {
                toValue: finalValue
            }
        ).start();
    }
    // Sets maximum height when opened.
    _setMaxHeight(event){
        this.setState({
            maxHeight   : event.nativeEvent.layout.height
        });
    }
    // Sets minimum height when closed.
    _setMinHeight(event){
        this.setState({
            minHeight   : event.nativeEvent.layout.height
        });
    }

    // Calls the inherited createNew function which is explained in TemplateScreen class.

    createNew(layoutID) {
        this.props.createNew(layoutID);
    }

    viewAllReports() {
        this.props.viewAllReports();
    }

    showMore = (forms) => {
        if (forms > 5) {
            return(
                <Text style={styles.more} onPress={() => this.viewAllReports()}>
                    Show more
                </Text>
            )
        } else {
            return null;
        }
    };

    render(){
        /* Renders the Layout and its children, which are defined in the TemplateScreen class.
           The TemplateScreen uses FlatList component as the Layout components child.
         */
        const forms = this.state.nofForms;

        return (
            <Animated.View
                style={[styles.container,{ height: this.state.animation }]}>
                <View onLayout={this._setMinHeight.bind(this)}>
                    <ListItem
                        containerStyle={ styles.ListItemStyle }
                        onPress={this.toggle.bind(this)} // Opens or closes the layout.
                        title={this.state.title} // Title of the layout.
                        subtitle={this.state.nofForms + ' Forms'} // Number of forms as a subtitle.
                        rightIcon={{ name: 'arrow-right', type: 'font-awesome', style: { marginRight: 10, fontSize: 15 } }}
                        onPressRightIcon={() => this.createNew(this.state.layoutID)} /* Navigates to NewReportScreen when
                                                                                        pressed.*/
                    />

                </View>

                <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
                    {this.props.children}
                    {this.showMore(forms)}
                </View>

            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({

    ListItemStyle: {
        height: 50
    },
    container: {
        backgroundColor: '#fff',
        margin:10,
        overflow:'hidden'
    },
    body: {
        padding     : 10,
        paddingTop  : 0
    },
    more: {
        color: '#88daf2',
        textDecorationLine: 'underline',
        padding: 10,
    },
});

export default Layout;
