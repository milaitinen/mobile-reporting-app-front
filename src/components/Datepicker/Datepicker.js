import DatePicker from 'react-native-datepicker';
import React, { Component } from 'react';
import styles from './styles';
import { Icon } from 'react-native-elements';
import { strings } from '../../locales/i18n';


class Datepicker extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { editable, isPreview, mode, answer, onChange } = this.props;

        const text          = (editable || !isPreview) ? styles.$gray1 : styles.$gray2;
        const border        = (editable || !isPreview) ? 0 : 2;
        const background    = (editable || !isPreview) ? 'white' : styles.$disabledBg;
        const icon          = (editable || !isPreview) ? styles.dateIcon : styles.disabledIcon;

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
                    confirmBtnText={strings('createNew.confirm')}
                    cancelBtnText={strings('createNew.cancel')}
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
                    confirmBtnText={strings('createNew.confirm')}
                    cancelBtnText={strings('createNew.cancel')}
                    minuteInterval={10}
                    iconComponent={<Icon name={'clock'} type={'evilicon'} size={40} iconStyle={icon}/>}
                    onDateChange={onChange}
                />
            );
        }
    }
}

export default Datepicker;