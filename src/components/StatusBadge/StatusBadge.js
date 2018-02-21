import React from 'react';
import { View, Text } from 'react-native';
import { Badge, Icon } from 'react-native-elements';
import styles from './styles';
import { strings } from '../../locales/i18n';

const StatusBadge = ({ dateCreated, dateAccepted }) =>{

    //TODO maybe there's a better way to match drafts...?
    if (!dateCreated) {
        return (
            <View style={styles.BadgeViewContainer}>
                <Badge textStyle = {styles.badgeTextStyle}
                    containerStyle = {[styles.badgeContainerStyle, { backgroundColor: '#87cce5' }]}>
                    <Text style={styles.badgeTextStyle}>{strings('templates.draft')}</Text>
                    <Icon name={'edit-2'} type={'feather'} iconStyle={styles.badgeIconStyle} />
                </Badge>
            </View>
        );
    } else if (!dateAccepted){
        return (
            <View style={styles.BadgeViewContainer}>
                <Badge textStyle = {styles.badgeTextStyle}
                    containerStyle = {[styles.badgeContainerStyle, { backgroundColor: '#f3fe99' }]}>
                    <Text style={ styles.badgeTextStyle }>{strings('templates.sent')}</Text>
                    <Icon name={'clock'} type={'feather'} iconStyle={styles.badgeIconStyle} />
                </Badge>
            </View>
        );
    } else {
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
};

export default StatusBadge;