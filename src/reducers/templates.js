import { STORE_TEMPLATES } from '../actions/templates';

const initialState = {
    templates: {}
};

const templatesReducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_TEMPLATES: {
            const newTemplates = action.templates.map((template) => {
                const templateObj = {};
                templateObj[template.id] = template;
                return templateObj;
            }).reduce((allTemplates, currentTemplate) => Object.assign(allTemplates, currentTemplate));

            return Object.assign(state.templates, newTemplates);
        }
        default:
            return state;
    }
};

export default templatesReducer;