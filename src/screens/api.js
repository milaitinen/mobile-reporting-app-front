import { Platform, AsyncStorage, NetInfo } from 'react-native';

import { url } from './urlsetting';


export const login = (username, password) => {
    return fetch(`${url}/users/login`, {//TODO: check with database api
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        })
    })  .then(response => { return response.json; })
        .catch(err => alert(err));
};

// Send a new report to the server, along with the username and token.
export const createNewReport = (username, report, token) => {
    return fetch(`${url}/users/${username}/reports`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(report)
    });
};

export const fetchFieldsByID = (templateId, token) => {
    return isNetworkConnected()
        .then((isConnected) => {
            if (!isConnected) { return fetchLocalFieldsByID(templateId); }
            return fetchRemoteFieldsByID(templateId, token);
        })
        .then((fieldsByID) => {
            saveData(`${url}/templates/${templateId}/fields`, fieldsByID);
            return fieldsByID;
        });
};

const fetchLocalFieldsByID = (templateId) => {
    return AsyncStorage.getItem(`${url}/templates/${templateId}/fields`)
        .then(data => {
            if (data !== null) {
                return JSON.parse(data);
            } else {
                return [];
            }
        });
};

const fetchRemoteFieldsByID = (templateId, token) => {
    return (
        fetch(`${url}/templates/${templateId}/fields`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                return response.json();
            })
    );
};

// Fetch templates from the server or ASyncStorage, depending on the availability of internet connection
// Fetch templates that the user has rights to
export const fetchTemplatesByUserID = (ID, token) => {
    return isNetworkConnected()
        .then((isConnected) => {
            if (!isConnected) { return fetchLocalTemplatesByUserID(ID); }
            return fetchRemoteTemplatesByUserID(ID, token);
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
const fetchRemoteTemplatesByUserID = (ID, token) => {
    return (
        fetch(`${url}/users/${ID}/templates`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                return response.json();
            })
    );
};

// Fetch reports by their templateID from the server if online, ASyncStorage otherwise
export const fetchReportsByTemplateID = (ID, token) => {
    return isNetworkConnected()
        .then((isConnected) => {
            if (!isConnected) { return fetchLocalReportsByTemplateID(ID); }
            return fetchRemoteReportsByTemplateID(ID, token);
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
const fetchRemoteReportsByTemplateID = (ID, token) => {
    return (
        fetch(`${url}/reports?templateid=${ID}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                return response.json();
            })
    );
};

// might come in handy???
export const fetchReportsByUserID = (ID, token) => {
    return isNetworkConnected()
        .then((isConnected) => {
            if (!isConnected) { return fetchLocalReportsByUserID(ID); }
            return fetchRemoteReportsByUserID(ID, token);
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

const fetchRemoteReportsByUserID = (ID, token) => {
    return (
        fetch(`${url}/users/${ID}/reports`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
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
