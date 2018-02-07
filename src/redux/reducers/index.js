import { combineReducers } from 'redux';

import user from './user';
import templates from './templates';
import reportsByTempID from './reports';
import newReport from './newReport';
import navReducer from './navReducer';
import preview from './preview';

export default combineReducers ({
    user,
    templates,
    reports: reportsByTempID,
    newReport,
    nav: navReducer,
    preview,
});