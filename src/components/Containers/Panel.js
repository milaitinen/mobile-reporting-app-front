import React, { Component } from 'react';
import { StyleSheet,Text,View,TouchableHighlight,Animated, Image } from 'react-native';
import { ListItem } from 'react-native-elements';

class Panel extends Component{
    constructor(props){
        super(props);
        this.state = {
            title       : props.title,
            nofForms    : props.nofForms,
            expanded    : false,
            animation   : new Animated.Value(50)
        };
    }

    toggle(){
        const
            initialValue    = this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
            finalValue      = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

        this.setState({
            expanded : !this.state.expanded
        });

        this.state.animation.setValue(initialValue);
        Animated.spring(
            this.state.animation,
            {
                toValue: finalValue
            }
        ).start();
    }

    _setMaxHeight(event){
        this.setState({
            maxHeight   : event.nativeEvent.layout.height
        });
    }

    _setMinHeight(event){
        this.setState({
            minHeight   : event.nativeEvent.layout.height
        });
    }

    createNew() {
        this.props.createNew();
    }

    render(){


        return (
            <Animated.View
                style={[styles.container,{ height: this.state.animation }]}>
                <View onLayout={this._setMinHeight.bind(this)}>
                    <ListItem
                        containerStyle={ styles.ListItemStyle }
                        onPress={this.toggle.bind(this)}
                        title={this.state.title}
                        subtitle={this.state.nofForms + ' Forms'}
                        rightIcon={{ name: 'arrow-right', type: 'font-awesome', style: { marginRight: 10, fontSize: 15 } }}
                        onPressRightIcon={() => this.createNew()}

                    />

                </View>

                <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
                    {this.props.children}
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
    titleContainer: {
        flexDirection: 'row'
    },
    title: {
        flex    : 1,
        padding : 10,
        color   :'#2a2f43',
        fontWeight:'bold'
    },

    buttonText: {
        fontWeight:'bold',
        fontSize: 25,
        paddingRight: 15,
    },

    button: {

    },
    body: {
        padding     : 10,
        paddingTop  : 0
    }
});

export default Panel;