import * as types from '../../src/redux/actions/connection';
import connectionReducer from '../../src/redux/reducers/connection.js';

const exampleState = {
    isConnected: false
};

describe('Connection reducer', () => {
    it('should handle TOGGLE_CONNECTION', () => {
        expect(
            connectionReducer(undefined, {
                type: types.TOGGLE_CONNECTION,
                isConnected: false
            })
        ).toEqual(
            {
                isConnected: false,
            }
        );
    });

    it('should handle SET_INITIAL_CONNECTION', () => {
        expect(
            connectionReducer(exampleState, {
                type: types.SET_INITIAL_CONNECTION,
                isConnected: true
            })
        ).toEqual(
            {
                isConnected: true
            }
        );
    });

    it('should return the initial state', () => {
        expect(
            connectionReducer(undefined, {})
        ).toEqual(
            {
                isConnected: true
            });
    });
});