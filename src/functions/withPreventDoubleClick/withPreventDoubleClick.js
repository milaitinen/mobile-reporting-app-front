import React from 'react';
import debounce from 'lodash.debounce';

/*
    Prevent onPress from triggering multiple times if pressed too quickly.
    Extends the touchable components like TouchableHighlight, Button etc.
    and takes the component as a parameter.
    NOTE: Doesn't work with buttons that navigate. To prevent the issue
    with buttons that navigate see function navigateWithDebounce in
    TemplateScreen.js and PreviewScreen.js.
*/

const withPreventDoubleClick = (WrappedComponent) => {

    class PreventDoubleClick extends React.PureComponent {

        debouncedOnPress = () => {
            // Short circuit evaluationn (if this.props.onPress is true) && (this.props.onPress() will execute)
            this.props.onPress && this.props.onPress();
        };
        // Debounce onPress if already pressed during 2000ms.
        onPress = debounce(this.debouncedOnPress, 2000, { leading: true, trailing: false });

        render() {
            // Returns the wrapped component.
            return (
                <WrappedComponent {...this.props} onPress={this.onPress} />
            );
        }
    }
    /* DisplayName to name the component. This name is used by React Native in debugging messages.
       This is a common pattern with React (Native) Higher Order Components (HoCs) */
    PreventDoubleClick.displayName = `withPreventDoubleClick(${WrappedComponent.displayName ||WrappedComponent.name})`;
    return PreventDoubleClick;
};

export default withPreventDoubleClick;
