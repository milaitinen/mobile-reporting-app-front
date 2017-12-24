import React, { Component } from 'react';
import { StyleSheet,Text,View,TouchableHighlight,Animated } from 'react-native';


class Panel extends Component{
    constructor(props){
        super(props);
        this.state = {
            title       : props.title,
            expanded    : false,
            animation   : new Animated.Value(40)
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

    onRowPress() {
        this.props.onRowPress();
    }

    render(){


        return (
            <Animated.View
                style={[styles.container,{ height: this.state.animation }]}>
                <View style={styles.titleContainer} onLayout={this._setMinHeight.bind(this)}>
                    <Text
                        style={styles.title}
                        onPress={this.toggle.bind(this)}>
                        {this.state.title}
                    </Text>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => this.onRowPress() }
                        underlayColor="#f1f1f1">
                        <Text
                            style={styles.buttonText}>+</Text>
                    </TouchableHighlight>
                </View>

                <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
                    {this.props.children}
                </View>

            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
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