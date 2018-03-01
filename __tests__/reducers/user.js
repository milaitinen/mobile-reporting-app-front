import * as types from '../../src/redux/actions/user';
import userReducer from '../../src/redux/reducers/user';

describe('user reducer', () => {
    it('should return the initial state', () => {
        expect(userReducer(undefined, {})).toEqual(
            {
                username: null,
<<<<<<< HEAD
=======
                password: null,
                serverUrl: null,
>>>>>>> dev
                token: null
            }
        );
    });

<<<<<<< HEAD
    it('should handle INSERT_PASSWORD', () => {
=======
    it('should handle INSERT_USERNAME', () => {
>>>>>>> dev
        expect(
            userReducer(undefined, {
                username: 'Maisa',
                type: types.INSERT_USERNAME
            })
        ).toEqual(
            {
                username: 'Maisa',
<<<<<<< HEAD
=======
                password: null,
                serverUrl: null,
                token: null,
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
                username: null,
                password: 'fdhjaklfhaj',
                serverUrl: null,
>>>>>>> dev
                token: null,
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
                username: null,
<<<<<<< HEAD
=======
                password: null,
                serverUrl: null,
>>>>>>> dev
                token: '02fafa.hjkfldhjfa.fdaeu',
            }
        );
    });
});

