export const TOGGLE_CONNECTION = 'TOGGLE_CONNECTION';

export const toggleConnection = ({ connectionStatus }) => ({
    type: TOGGLE_CONNECTION,
    isConnected: connectionStatus,
});