// easier to refactor later and debug
export const STORE_TEMPLATES = 'STORE_TEMPLATES';

export const storeTemplates = (templates) => ({
    type: STORE_TEMPLATES,
    templates: templates
});
