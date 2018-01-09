import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

const AppBackground = ({ children }) => {
    return (
        <LinearGradient
            colors={[styles.$blue1, '#364a7d', '#2e3f6b']}
            style={styles.contentContainer}
        >
            {children}
        </LinearGradient>
    );
};

export default AppBackground;