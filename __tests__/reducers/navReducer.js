import navReducer from '../../src/redux/reducers/navReducer';

describe('NavReducer reducer', () => {
    it('should return the initial nav state', () => {
        expect(
            navReducer(undefined, {})
        ).toEqual(
            {
                index: 0,
                routes: [
                    {
                        key: 'id-1522331586174-1',
                        routeName: 'loginScreen'
                    }
                ]
            }
        );
    });
});