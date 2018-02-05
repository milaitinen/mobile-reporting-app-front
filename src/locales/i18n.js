import I18n from 'react-native-i18n';

//locales
import en from './en.json';
import fi from './fi.json';
import es from './es.json';

/* Can add support for languages that are read from right to left
* Add */

I18n.fallbacks = true;

//supported languages
I18n.translations = {
    en,
    fi,
    es
};

//This changes the used language (used for testing)
//I18n.locale = 'fi';

export function strings(name, params = {}) {
    return I18n.t(name, params);
}

//export default I18n;
