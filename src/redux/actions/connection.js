export const TOGGLE_CONNECTION = 'TOGGLE_CONNECTION';
export const SET_INITIAL_CONNECTION ='SET_INITIAL_CONNECTION';

export const toggleConnection = ({ connectionStatus }) => ({
    type: TOGGLE_CONNECTION,
    isConnected: connectionStatus,
});

export const setInitialConnection = ({ connectionStatus }) => ({
    type: SET_INITIAL_CONNECTION,
    isConnected: connectionStatus,
});