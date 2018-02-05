import React from 'react';
import { View, Text } from 'react-native';
import { Badge, Icon } from 'react-native-elements';
import styles from './styles';
import { strings } from '../../locales/i18n';

const StatusBadge = ({ dateAccepted }) =>{
    /*
    if(JOKU DRAFTEHTO) {
       return (
        <View style={styles.BadgeViewContainer}>
             <Badge textStyle = {layoutStyles.badgeTextStyle}
                containerStyle = {[layoutStyles.badgeContainerStyle, { backgroundColor: '#87cce5' }]}>
                <Text style={layoutStyles.badgeTextStyle}>{strings('templates.draft')}</Text>
                <Icon name={'edit-2'} type={'feather'} iconStyle={layoutStyles.badgeIconStyle} />
            </Badge>
        </View>
    );
    }
     */

    if (dateAccepted != null){
        return (
            <View style={styles.BadgeViewContainer}>
                <Badge textStyle = {styles.badgeTextStyle}
                    containerStyle = {[styles.badgeContainerStyle, { backgroundColor: '#99d9ad' }]}>
                    <Text style={styles.badgeTextStyle}>{strings('templates.approved')}</Text>
                    <Icon name={'check'} type={'feather'} iconStyle={styles.badgeIconStyle} />
                </Badge>

                <Text style={styles.dateAccepted}>
                    {dateAccepted}
                </Text>
            </View>

        );
    }
    return (
        <View style={styles.BadgeViewContainer}>
            <Badge textStyle = {styles.badgeTextStyle}
                containerStyle = {[styles.badgeContainerStyle, { backgroundColor: '#f3fe99' }]}>
                <Text style={ styles.badgeTextStyle }>{strings('templates.sent')}</Text>
                <Icon name={'clock'} type={'feather'} iconStyle={styles.badgeIconStyle} />
            </Badge>
        </View>
    );

};

export default StatusBadge;