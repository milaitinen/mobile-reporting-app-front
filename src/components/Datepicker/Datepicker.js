import DatePicker from 'react-native-datepicker';
import React, { Component } from 'react';
import styles from './styles';
import { Icon } from 'react-native-elements';


class Datepicker extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { editable, mode, answer, onChange } = this.props;

        const text          = editable ? styles.$gray1 : styles.$gray2;
        const border        = editable ? 0 : 2;
        const background    = editable ? 'white' : styles.$disabledBg;
        const icon          = editable ? styles.dateIcon : styles.disabledIcon;

        if (mode === 'date') {
            return (
                <DatePicker
                    disabled={!editable}
                    style={styles.container}
                    customStyles={{
                        dateInput: {
                            borderWidth: border,
                            borderRadius: styles.$inputRadius,
                            backgroundColor: background,
                            borderColor: styles.$gray3
                        },
                        dateText: {
                            color: text,
                            fontFamily: styles.$robotoLight,
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
                    disabled={ !editable }
                    style={styles.container}
                    customStyles={{
                        dateInput: {
                            borderWidth: border,
                            borderRadius: styles.$inputRadius,
                            backgroundColor: background,
                            borderColor: styles.$gray3
                        },
                        dateText: {
                            color: text,
                            fontFamily: styles.$robotoLight,
                        }
                    }}
                    date={answer}
                    mode={mode}
                    format="HH:mm"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    minuteInterval={10}
                    iconComponent={<Icon name={'clock'} type={'evilicon'} size={40} iconStyle={icon}/>}
                    onDateChange={onChange}
                />
            );
        }
    }
}

export default Datepicker;