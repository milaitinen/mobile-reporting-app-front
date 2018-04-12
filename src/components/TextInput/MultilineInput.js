import React, { Component } from 'react';
import { ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import styles from './styles';

class MultilineInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.value,
            textYPosition: 0,
            textHeight: 0,
        };
    }

    updateScrollPosition(width, height) {
        const yPositionDifference = (height - this.state.textHeight);
        const newYPosition = this.state.textYPosition + yPositionDifference;
        console.log(width, height, newYPosition);

        this.scroll.scrollTo({ x: 0, y: newYPosition, animated: false });
        this.setState({ textHeight: height });
    }

    handleScroll(scrollEvent) {
        const YPosition = scrollEvent.nativeEvent.contentOffset.y;
        this.setState({ textYPosition: YPosition });
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior = 'position'
                keyboardVerticalOffset={90}
                keyboardDissmissMode={'on-drag'}
            >
                <ScrollView
                    ref={(scroll) => { this.scroll = scroll; }}
                    onContentSizeChange={(width, height) => this.updateScrollPosition(width, height)}
                    style={styles.scrollContainer}
                    //scrollEventThrottle={1}
                    onScroll={nativeEvent => this.handleScroll(nativeEvent)}
                >
                    <TextInput
                        blurOnSubmit={false}
                        multiline
                        style={styles.multilineInput}
                        underlineColorAndroid = 'transparent'
                        onChangeText={(input) => {
                            this.setState({ text: input });
                            //this.props.onChangeFunction(text);
                        }}
                        placeholder={this.props.placeholder}
                        placeholderTextColor={this.props.placeholderTextColor}
                    />

                </ScrollView>
            </KeyboardAvoidingView>

        );
    }
}

export default MultilineInput;