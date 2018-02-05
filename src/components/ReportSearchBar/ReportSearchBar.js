import React from 'react';
import { SearchBar } from 'react-native-elements';
import styles from './styles';
import { strings } from '../../locales/i18n';

const ReportSearchBar = () => {
    return (
        <SearchBar
            lightTheme
            containerStyle = {styles.searchBarContainer}
            inputStyle = { styles.searchBarInput }
            icon = {{ style: styles.searchIcon }}
            placeholder={strings('templates.search')}
        />
    );
};

export default ReportSearchBar;