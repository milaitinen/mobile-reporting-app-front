export const TOGGLE_CONNECTION = 'TOGGLE_CONNECTION';

export const toggleConnection = ({ isConnected }) => ({
    type: TOGGLE_CONNECTION,
    isConnected: isConnected,
});