import { Platform, AsyncStorage, NetInfo } from 'react-native';

import { url } from './urlsetting';

export const login = (username, password) => {
    return fetch(`${url}/login`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'username': username,
            'password': password,
        })
    }).then(response => {
        return JSON.parse(response._bodyInit).token;
    }).catch(err => alert(err));
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

export const fetchFieldsByTemplateID = (username, templateID, token) => {
    return isNetworkConnected()
        .then((isConnected) => {
            if (!isConnected) { return fetchLocalFieldsByTemplateID(username, templateID); }
            return fetchRemoteFieldsByTemplateID(username, templateID, token);
        })
        .then((fieldsByTemplateID) => {
            saveData(`${url}/users/${username}/templates/${templateID}/fields`, fieldsByTemplateID);
            return fieldsByTemplateID;
        });
};

const fetchLocalFieldsByTemplateID = (username, templateID) => {
    return AsyncStorage.getItem(`${url}/users/${username}/templates/${templateID}/fields`)
        .then(data => {
            if (data !== null) {
                return JSON.parse(data);
            } else {
                return [];
            }
        });
};

export const fetchRemoteFieldsByTemplateID = (username, templateID, token) => {
    return (
        fetch(`${url}/users/${username}/templates/${templateID}/fields`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                return response.json();
            })
    );
};

// used to store drafts
export const saveDraft = (username, templateID, draft) => {
    fetchDraftsByTemplateID(username, templateID)
        .then((drafts) => {
            // see if there is already a draft with the same id
            const draftIndex = drafts.findIndex(x => x.id === draft.id);

            if (draftIndex < 0) {
                drafts.push(draft);
            } else {
                drafts[draftIndex] = draft;
            }
            // give each draft a unique, negative id
            drafts.map((draft, i) => draft.id = -Math.abs(i + 1));
            saveData(`${url}/users/${username}/templates/${templateID}`, drafts);

            return (drafts[drafts.length - 1].id);
        });
};

export const removeDraft =  (username, templateID, draftID) => {
    fetchDraftsByTemplateID(username, templateID)
        .then((drafts) => {
            const draftRemoved = drafts.filter(draft => draft.id !== draftID);
            saveData(`${url}/users/${username}/templates/${templateID}`, draftRemoved);
        });
};

export const fetchDraftsByTemplateID = (username, templateID) => {
    return AsyncStorage.getItem(`${url}/users/${username}/templates/${templateID}`) // NOTE: this url is just a key
        .then(data => {
            if (data !== null) {
                return JSON.parse(data);
            } else {
                return [];
            }
        });
};

// fetch reports that are only locally saved
export const fetchLocalReports = (username, templateID) => {
    return AsyncStorage.getItem(`${url}/users/${username}/templates/${templateID}`) // NOTE: this url is just a key
        .then(data => {
            if (data !== null) {
                return JSON.parse(data);
            } else {
                return [];
            }
        });
};

// for future use?
export const fetchFieldsByReportID = (username, templateID, reportID, token) => {
    return isNetworkConnected()
        .then((isConnected) => {
            if (!isConnected || reportID === 0) { return fetchLocalFieldsByReportID(username, templateID, reportID); }
            return fetchRemoteFieldsByReportID(username, templateID, reportID, token);
        })
        .then((fieldsByReportID) => {
            saveData(`${url}/users/${username}/templates/${templateID}/reports/${reportID}/fields`, fieldsByReportID);
            return fieldsByReportID;
        });
};

// not yet in use
export const fetchLocalFieldsByReportID = (username, templateID, reportID) => {
    return AsyncStorage.getItem(`${url}/users/${username}/templates/${templateID}/reports/${reportID}/fields`)
        .then(data => {
            if (data !== null) {
                return JSON.parse(data);
            } else {
                return [];
            }
        });
};

// not yet in use
const fetchRemoteFieldsByReportID = (username, templateID, reportID, token) => {
    return (
        fetch(`${url}/users/${username}/templates/${templateID}/reports/${reportID}/fields`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                return response.json();
            })
    );
};


/*
 Fetch templates from the server or ASyncStorage, depending on the availability of internet connection.
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

/*
 Fetch all templates from ASyncStorage in case there is no internet connection.
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
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (response._bodyText === '') response._bodyText = '[]';
                return response.json();
            })
    );
};

/* Fetch reports by their templateID from the server if online, ASyncStorage otherwise */
export const fetchReportsByTemplateID = (username, templateID, token) => {
    return isNetworkConnected()
        .then((isConnected) => {
            if (!isConnected) { return fetchLocalReportsByTemplateID(username, templateID); }
            return fetchRemoteReportsByTemplateID(username, templateID, token);
        })
        .then((reports) => {
            saveData(`${url}/users/${username}/templates/${templateID}/reports?sort=-datecreated`, reports);
            return reports;
        });
};

/* Fetch Reports by TemplateID from ASyncStorage in case there is no internet connection.
   If no data has been stored an empty value will be returned. */
const fetchLocalReportsByTemplateID = (username, templateID) => {
    return AsyncStorage.getItem(`${url}/users/${username}/templates/${templateID}/reports?sort=-datecreated`)
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
        fetch(`${url}/users/${username}/templates/${templateID}/reports?sort=-datecreated`, {
            headers: {
                'Authorization': `Bearer ${token}`
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
                'Authorization': `Bearer ${token}`
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

/*
const removeData = (dataUrl) => {
    try {
        AsyncStorage.removeItem(dataUrl);
    } catch (error) {
        console.error(error);
    }
};
*/

// Necessary because of a bug on iOS https://github.com/facebook/react-native/issues/8615#issuecomment-287977178
export function isNetworkConnected() {
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
}
