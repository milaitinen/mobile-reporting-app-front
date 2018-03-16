import DatePicker from 'react-native-datepicker';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import styles from './styles';
import { Icon } from 'react-native-elements';

const Datepicker = ({ editable, mode, answer, onChange }) => {
    const text = editable ? EStyleSheet.value('$placeholder') : EStyleSheet.value('$disabledPlaceholder');
    const border = editable ? 0 : 2;
    const background = editable ? 'white' : EStyleSheet.value('$disabled');
    const icon = editable ? styles.dateIcon : styles.disabledIcon;

    if (mode === 'date') {
        return (
            <DatePicker
                disabled = {!editable}
                style = {styles.dateStyleClass}
                customStyles={{
                    dateInput: {
                        borderWidth: border,
                        borderRadius: EStyleSheet.value('$inputBorderRadius'),
                        backgroundColor: background,
                        borderColor: EStyleSheet.value('$disabledBorder')
                    },
                    dateText: {
                        color: text,
                        fontFamily: EStyleSheet.value('$primaryFont'),
                    }
                }}
                date={answer}
                mode={mode}
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                iconComponent={<Icon name={'calendar'} type={'evilicon'} size={40} iconStyle={icon}/>}
                onDateChange={onChange}
            />
        );
    } else {
        return (
            <DatePicker
                disabled ={ !editable }
                style = {styles.dateStyleClass}
                customStyles = {{
                    dateInput: {
                        borderWidth: border,
                        borderRadius: EStyleSheet.value('$inputBorderRadius'),
                        backgroundColor: background,
                        borderColor: EStyleSheet.value('$disabledBorder')
                    },
                    dateText: {
                        color: text,
                        fontFamily: EStyleSheet.value('$primaryFont'),
                    }
                }}
                date = {answer}
                mode = {mode}
                format="HH:mm"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                minuteInterval={10}
                iconComponent={<Icon name={'clock'} type={'evilicon'} size={40} iconStyle={icon}/>}
                onDateChange={onChange}
            />
        );
    }
};

export default Datepicker;