import React from 'react';
import { SearchBar } from 'react-native-elements';
import styles from './styles';

const ReportSearchBar = () => {
    return (
        <SearchBar
            lightTheme
            containerStyle = {styles.searchBarContainer}
            inputStyle = { styles.searchBarInput }
            icon = {{ style: styles.searchIcon }}
            placeholder='Search for reports'
        />
    );
};

export default ReportSearchBar;