import navReducer from '../../src/redux/reducers/navReducer';

// keys are date and order-of-test based,
const filterKeys = (state) => {
    if (state.routes) {
        return {
            ...state,
            routes: state.routes.map((route) => {
                const { key, ...others } = route;
                return filterKeys(others);
            }),
        };
    }
    return state;
};

describe('NavReducer reducer', () => {
    it('should return the initial nav state', () => {
        const state = filterKeys(navReducer(undefined, {}));
        expect(state.routes).toEqual(
            [{ routeName: 'loginScreen' }]
        );
    });
});