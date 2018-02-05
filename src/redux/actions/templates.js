// easier to refactor later and debug
export const STORE_TEMPLATES = 'STORE_TEMPLATES';
export const EMPTY_TEMPLATES = 'EMPTY_TEMPLATES';

export const storeTemplates = (templates) => ({
    type: STORE_TEMPLATES,
    templates: templates
});

export const emptyTemplates = () => ({
    type: EMPTY_TEMPLATES,
});