import * as types from '../../src/redux/actions/user';
import userReducer from '../../src/redux/reducers/user';

describe('user reducer', () => {
    it('should return the initial state', () => {
        expect(userReducer(undefined, {})).toEqual(
            {
                username: '',
                password: null,
                token: ''
            }
        );
    });

    it('should handle INSERT_USERNAME', () => {
        expect(
            userReducer(undefined, {
                username: 'Maisa',
                type: types.INSERT_USERNAME
            })
        ).toEqual(
            {
                username: 'Maisa',
                password: null,
                token: '',
            }
        );
    });


    it('should handle INSERT_PASSWORD', () => {
        expect(
            userReducer(undefined, {
                password: 'fdhjaklfhaj',
                type: types.INSERT_PASSWORD
            })
        ).toEqual(
            {
                username: '',
                password: 'fdhjaklfhaj',
                token: '',
            }
        );
    });

    it('should handle INSERT_TOKEN', () => {
        expect(
            userReducer(undefined, {
                type: types.INSERT_TOKEN,
                token: '02fafa.hjkfldhjfa.fdaeu'
            })
        ).toEqual(
            {
                username: '',
                password: null,
                token: '02fafa.hjkfldhjfa.fdaeu',
            }
        );
    });
});

