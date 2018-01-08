import { Platform, AsyncStorage, NetInfo } from 'react-native';

// Necessary because of a bug on iOS https://github.com/facebook/react-native/issues/8615#issuecomment-287977178
const isNetworkConnected = () => {
    if (Platform.OS === 'ios') {
        return new Promise(resolve => {
            const handleFirstConnectivityChangeIOS = isConnected => {
                NetInfo.isConnected.removeEventListener('connectionChange', handleFirstConnectivityChangeIOS);
                resolve(isConnected);
            };
            NetInfo.isConnected.addEventListener('connectionChange', handleFirstConnectivityChangeIOS);
        });
    }
    return NetInfo.isConnected.fetch();
};

/* Fetch data from ASyncStorage in case there is no internet connection.
   If no data has been stored an empty value will be returned. */
const fetchLocalData = (dataUrl) => {
    return AsyncStorage.getItem(dataUrl)
        .then(data => {
            if (data !== null) {
                return JSON.parse(data);
            } else {
                return [];
            }
        });
};

// Fetch remote data i.e. fetch data from the server.
const fetchRemoteData = (dataUrl) => {
    return (
        fetch(dataUrl)
            .then(response => {
                return response.json();
            })
    );
};

/* Store data to ASyncStorage, a simple key-value storage system global to the app.
   Keys and values are stored as a string. */
const saveData = (dataUrl, data) => {
    AsyncStorage.setItem(dataUrl, JSON.stringify(data));
};

/* Fetch data from the server or ASyncStorage, depending on the availability of internet connection */
export const fetchData = (dataUrl) => {
    return isNetworkConnected()
        .then((isConnected) => {
            if (!isConnected) { return fetchLocalData(dataUrl); }
            return fetchRemoteData(dataUrl);
        })
        .then((data) => {
            saveData(dataUrl, data);
            return data;
        });
};