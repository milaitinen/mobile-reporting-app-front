import { Platform, AsyncStorage, NetInfo } from 'react-native';

import { url } from './urlsetting';


// Send a new report to the server, along with the userID
export const createNewReport = (userID, report) => {
    return fetch(`${url}/users/${userID}/reports`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(report)
    });
};

export const fetchFieldsByID = (id) => {
    console.log('fetchFieldsByID', id);
    return isNetworkConnected()
        .then((isConnected) => {
            if (!isConnected) { return fetchLocalFieldsByID(id); }
            return fetchRemoteFieldsByID(id);
        })
        .then((fieldsByID) => {
            saveData(`${url}/templates/${id}/fields`, fieldsByID);
            return fieldsByID;
        });
};

const fetchLocalFieldsByID = (id) => {
    console.log('fetchLocalFieldsByID', id);
    return AsyncStorage.getItem(`${url}/templates/${id}/fields`)
        .then(data => {
            if (data !== null) {
                return JSON.parse(data);
            } else {
                return [];
            }
        });
};

const fetchRemoteFieldsByID = (id) => {
    console.log('fetchRemoteFieldsByID', id);
    return (
        fetch(`${url}/templates/${id}/fields`)
            .then(response => {
                return response.json();
            })
    );
};

// Fetch templates from the server or ASyncStorage, depending on the availability of internet connection
// Fetch templates that the user has rights to
export const fetchTemplatesByUserID = (ID) => {
    return isNetworkConnected()
        .then((isConnected) => {
            if (!isConnected) { return fetchLocalTemplatesByUserID(ID); }
            return fetchRemoteTemplatesByUserID(ID);
        })
        .then((templates) => {
            saveData(`${url}/users/${ID}/templates`, templates);
            return templates;
        });
};

/* Fetch all templates from ASyncStorage in case there is no internet connection.
   If no data has been stored an empty value will be returned. */
const fetchLocalTemplatesByUserID = (ID) => {
    return AsyncStorage.getItem(`${url}/users/${ID}/templates`)
        .then(data => {
            if (data !== null) {
                return JSON.parse(data);
            } else {
                return [];
            }
        });
};

// Fetch all templates from the server
const fetchRemoteTemplatesByUserID = (ID) => {
    return (
        fetch(`${url}/users/${ID}/templates`)
            .then(response => {
                console.log('response', response);
                return response.json();
            })
    );
};

// Fetch reports by their templateID from the server if online, ASyncStorage otherwise
export const fetchReportsByTemplateID = (ID) => {
    return isNetworkConnected()
        .then((isConnected) => {
            if (!isConnected) { return fetchLocalReportsByTemplateID(ID); }
            return fetchRemoteReportsByTemplateID(ID);
        })
        .then((templates) => {
            saveData(`${url}/reports?templateid=${ID}`, templates);
            return templates;
        });
};

/* Fetch Reports by TemplateID from ASyncStorage in case there is no internet connection.
   If no data has been stored an empty value will be returned. */
const fetchLocalReportsByTemplateID = (ID) => {
    return AsyncStorage.getItem(`${url}/reports?templateid=${ID}`)
        .then(data => {
            if (data !== null) {
                return JSON.parse(data);
            } else {
                return [];
            }
        });
};

// Fetch reports by templateID from the server
const fetchRemoteReportsByTemplateID = (ID) => {
    return (
        fetch(`${url}/reports?templateid=${ID}`)
            .then(response => {
                return response.json();
            })
    );
};

// might come in handy???
export const fetchReportsByUserID = (ID) => {
    return isNetworkConnected()
        .then((isConnected) => {
            if (!isConnected) { return fetchLocalReportsByUserID(ID); }
            return fetchRemoteReportsByUserID(ID);
        })
        .then((reports) => {
            saveData(`${url}/users/${ID}/reports`, reports);
            return reports;
        });
};

const fetchLocalReportsByUserID = (ID) => {
    return AsyncStorage.getItem(`${url}/users/${ID}/reports`)
        .then(data => {
            if (data !== null) {
                return JSON.parse(data);
            } else {
                return [];
            }
        });
};

const fetchRemoteReportsByUserID = (ID) => {
    return (
        fetch(`${url}/users/${ID}/reports`)
            .then(response => {
                return response.json();
            })
    );
};

/* Store data (layouts, reports - depending on the url) to ASyncStorage, a simple key-value storage system global to the app.
   Keys and values are stored as a string. */
const saveData = (dataUrl, data) => {
    AsyncStorage.setItem(dataUrl, JSON.stringify(data));
};

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