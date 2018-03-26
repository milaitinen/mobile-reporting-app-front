import React from 'react';
import { View, Text } from 'react-native';
import { Badge, Icon } from 'react-native-elements';
import styles from './styles';
import { strings } from '../../locales/i18n';

const StatusBadge = ({ dateAccepted, isDraft, inQueue }) =>{

    const color = isDraft ? '#87cce5' : inQueue? '#ffbe61' : !dateAccepted ? '#f3fe99' : '#99d9ad';
    const text = isDraft ? strings('templates.draft') : inQueue? strings('templates.pending') : !dateAccepted ? strings('templates.sent') : strings('templates.approved');
    const icon = isDraft ? 'edit-2' : inQueue? 'refresh-cw' : !dateAccepted ? 'clock' : 'check';

    return (
        <View style={styles.BadgeViewContainer}>
            <Badge textStyle = {styles.badgeTextStyle}
                containerStyle = {[styles.badgeContainerStyle, { backgroundColor: color }]}>
                <Text style={styles.badgeTextStyle}>{text}</Text>
                <Icon name={icon} type={'feather'} iconStyle={styles.badgeIconStyle} />
            </Badge>
        </View>
    );
};

export default StatusBadge;