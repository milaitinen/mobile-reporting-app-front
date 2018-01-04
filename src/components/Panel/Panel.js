import React, { Component } from 'react';
import { View, Animated } from 'react-native';
import { ListItem } from 'react-native-elements';
import panelStyles from './panelStyles';

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
                style={[panelStyles.container,{ height: this.state.animation }]}>
                <View onLayout={this._setMinHeight.bind(this)}>
                    <ListItem
                        containerStyle={ panelStyles.ListItemStyle }
                        onPress={this.toggle.bind(this)}
                        title={this.state.title}
                        subtitle={this.state.nofForms + ' Forms'}
                        rightIcon={{ name: 'note-add', type: 'Materialicons', style: panelStyles.rightIconStyle,  }}
                        onPressRightIcon={() => this.createNew()}

                    />

                </View>

                <View style={panelStyles.body} onLayout={this._setMaxHeight.bind(this)}>
                    {this.props.children}
                </View>

            </Animated.View>
        );
    }
}

export default Panel;
