import { STORE_TEMPLATES, EMPTY_TEMPLATES } from '../actions/templates';

const initialState = {};

// return (Array(templates)) as object that has templateID as its keys and matching report as its values
const matchTemplateID = (state, action) => {
    if (action.templates.length < 1) return {};
    return (
        action.templates.map((template) => {
            const templateObj = {};
            templateObj[template.id] = template;
            return templateObj;
        }).reduce((allTemplates, currentTemplate) => Object.assign(allTemplates, currentTemplate))
    );
};

const templatesReducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_TEMPLATES: {
            const newTemplates = matchTemplateID(state, action);
            const newState = Object.assign(state.templates || {}, newTemplates);
            return newState;
        }
        case EMPTY_TEMPLATES: {
            return initialState;
        }
        default:
            return state;
    }
};

export default templatesReducer;
