import React from 'react';
import debounce from 'lodash.debounce';

/*
    Prevent onPress from triggering multiple times if pressed too quickly.
    Extends the touchable components like TouchableHighlight, Button etc.
    NOTE: Doesn't work with buttons that navigate. To prevent the issue
    with buttons that navigate see functions/navigateWithDebounce.
*/

const withPreventDoubleClick = (WrappedComponent) => {

    class PreventDoubleClick extends React.PureComponent {

        debouncedOnPress = () => {
            this.props.onPress && this.props.onPress();
        };

        onPress = debounce(this.debouncedOnPress, 1000, { leading: true, trailing: false });

        render() {
            return (
                <WrappedComponent {...this.props} onPress={this.onPress} />
            );
        }
    }

    PreventDoubleClick.displayName = `withPreventDoubleClick(${WrappedComponent.displayName ||WrappedComponent.name})`;
    return PreventDoubleClick;
};

export default withPreventDoubleClick;
