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

export const fetchFieldsByID = (username, templateId, token) => {
    return isNetworkConnected()
        .then((isConnected) => {
            if (!isConnected) { return fetchLocalFieldsByID(username, templateId); }
            return fetchRemoteFieldsByID(username, templateId, token);
        })
        .then((fieldsByID) => {
            saveData(`${url}/users/${username}/templates/${templateId}/fields`, fieldsByID);
            return fieldsByID;
        });
};

const fetchLocalFieldsByID = (username, templateId) => {
    return AsyncStorage.getItem(`${url}/users/${username}/templates/${templateId}/fields`)
        .then(data => {
            if (data !== null) {
                return JSON.parse(data);
            } else {
                return [];
            }
        });
};

const fetchRemoteFieldsByID = (username, templateId, token) => {
    return (
        fetch(`${url}/users/${username}/templates/${templateId}/fields`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                return response.json();
            })
    );
};

/* Fetch templates from the server or ASyncStorage, depending on the availability of internet connection
   Fetch templates that the user has rights to. */
export const fetchTemplatesByUsername = (username, token) => {
    return isNetworkConnected()
        .then((isConnected) => {
            if (!isConnected) { return fetchLocalTemplatesByUsername(username); }
            return fetchRemoteTemplatesByUsername(username, token);
        })
        .then((templates) => {
            saveData(`${url}/users/${username}/templates`, templates);
            return templates;
        });
};

/* Fetch all templates from ASyncStorage in case there is no internet connection.
   If no data has been stored an empty value will be returned. */
const fetchLocalTemplatesByUsername = (username) => {
    return AsyncStorage.getItem(`${url}/users/${username}/templates`)
        .then(data => {
            if (data !== null) {
                return JSON.parse(data);
            } else {
                return [];
            }
        });
};

// Fetch all templates from the server
const fetchRemoteTemplatesByUsername = (username, token) => {
    return (
        fetch(`${url}/users/${username}/templates`, {
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
export const fetchReportsByTemplateID = (username, templateID, token) => {
    return isNetworkConnected()
        .then((isConnected) => {
            if (!isConnected) { return fetchLocalReportsByTemplateID(username, templateID); }
            return fetchRemoteReportsByTemplateID(username, templateID, token);
        })
        .then((reports) => {
            saveData(`${url}/users/${username}/templates/${templateID}/reports`, reports);
            return reports;
        });
};

/* Fetch Reports by TemplateID from ASyncStorage in case there is no internet connection.
   If no data has been stored an empty value will be returned. */
const fetchLocalReportsByTemplateID = (username, templateID) => {
    return AsyncStorage.getItem(`${url}/users/${username}/templates/${templateID}/reports`)
        .then(data => {
            if (data !== null) {
                return JSON.parse(data);
            } else {
                return [];
            }
        });
};

// Fetch reports by templateID from the server
const fetchRemoteReportsByTemplateID = (username, templateID, token) => {
    return (
        fetch(`${url}/users/${username}/templates/${templateID}/reports`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                return response.json();
            })
    );
};

/* Returns all the reports made by the user specified by the username. */
export const fetchReportsByUsername = (username, token) => {
    return isNetworkConnected()
        .then((isConnected) => {
            if (!isConnected) { return fetchLocalReportsByUsername(username); }
            return fetchRemoteReportsByUsername(username, token);
        })
        .then((reports) => {
            saveData(`${url}/users/${username}/reports`, reports);
            return reports;
        });
};

const fetchLocalReportsByUsername = (username) => {
    return AsyncStorage.getItem(`${url}/users/${username}/reports`)
        .then(data => {
            if (data !== null) {
                return JSON.parse(data);
            } else {
                return [];
            }
        });
};

const fetchRemoteReportsByUsername = (username, token) => {
    return (
        fetch(`${url}/users/${username}/reports`, {
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
