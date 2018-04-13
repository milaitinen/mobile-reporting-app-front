import { toggleConnection, setInitialConnection } from '../../src/redux/actions/connection';

describe('Test connection actions', () => {
    it('Test toggling the connection status when toggleConnection is called', () => {
        const insert = toggleConnection({ connectionStatus: false });
        expect(insert).toEqual({ type: 'TOGGLE_CONNECTION', isConnected: false });
    }) ;
    it('test setting the inital connection status when setInitialConnection is called.', () => {
        const insert = setInitialConnection({ connectionStatus: true });
        expect(insert).toEqual({ type: 'SET_INITIAL_CONNECTION', isConnected: true });
    });
});