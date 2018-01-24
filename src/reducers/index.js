import { combineReducers } from 'redux';

import user from './user';
import templates from './templates';
import reports from './reports';

export default combineReducers ({
    user,
    templates,
    reports,
});