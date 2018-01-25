import { STORE_TEMPLATES } from '../actions/templates';

const initialState = {
    templates: {}
};

// return (Array(templates)) as object that has templateID as its keys and matching report as its values
const matchTemplateID = (state, action) => {
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
            //console.log(state.templates)
            const newState = Object.assign(state.templates || {}, newTemplates);
            return newState;
        }
        default:
            return state;
    }
};

export default templatesReducer;
