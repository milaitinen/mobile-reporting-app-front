import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

const AppBackground = ({ children, style }) => {

    if (style === 'no-padding') {
        return (
            <LinearGradient
                colors={[styles.$blue1, styles.$blue2, styles.$blue3]}
                style={styles.gradientNoPadding}
            >
                {children}
            </LinearGradient>
        );
    }

    return (
        <LinearGradient
            colors={[styles.$blue1, styles.$blue2, styles.$blue3]}
            style={styles.gradientBg}
        >
            {children}
        </LinearGradient>
    );
};

export default AppBackground;