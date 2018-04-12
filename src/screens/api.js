import { AsyncStorage, NetInfo, } from 'react-native';
import Config from 'react-native-config';
import { asyncForEach } from '../functions/helpers';

//import { url } from './urlsetting';

const url = Config.API_URL;

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


/**
 * Send pending (enqueued) reports to the server. Doesn't check for connection, need to do that elsewhere.
 * Remove reports from AsyncStorage after sending.
 * Returns true if sent reports, false if nothing was sent.
 */
export const sendPendingReportsByTemplateID = (username, templateID, token) => {

    const getItemThatWaits = async () => {
        const data = await AsyncStorage.getItem(`${url}/users/${username}/queue/${templateID}`);
        if (data) {
            const report = Object.values(JSON.parse(data));
            report.forEach(r => createNewReport(username, r, token));
            removeData(`${url}/users/${username}/queue/${templateID}`);
            return true;
        }
        else {
            return false;
        }
    };

    return getItemThatWaits();
};

/**
 * Fetches templates and then sends pending queue by template ids. Needed in for sending pending
 * reports when logged in, because templates are not yet fetched and stored in redux. In other screens
 * use of sendPendingReportsByTemplateID is wiser to avoid unnecessary fetching.
 * Returns true if sent something, false otherwise
 * TODO: Maybe only fetch templates and reports after login and not in TemplateScreen?
 */
export const sendAllPendingReports = (username, token) => {
    let sentSomething = false;
    return fetchTemplatesByUsername(username, token)
        .then(async templates => {
            await asyncForEach(templates, async template => {
                const status = await sendPendingReportsByTemplateID(username, template.template_id, token);
                if (status == true) { sentSomething = true; }
            });
            return sentSomething;
        });
};

/**
 *  Send a new report to the server, along with the username and token.
 */
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

export const fetchEmptyTemplate = (username, templateID, token) => {
    return isNetworkConnected()
        .then((isConnected) => {
            if (!isConnected) { return fetchLocalEmptyTemplate(username, templateID); }
            return fetchRemoteEmptyTemplate(username, templateID, token);
        })
        .then((template) => {
            saveData(`${url}/users/${username}/templates/${templateID}/empty`, template);
            return template;
        });
};

const fetchLocalEmptyTemplate = (username, templateID) => {
    return AsyncStorage.getItem(`${url}/users/${username}/templates/${templateID}/empty`)
        .then(data => {
            if (data !== null) {
                return JSON.parse(data);
            } else {
                return [];
            }
        });
};


export const fetchRemoteEmptyTemplate = (username, templateID, token) => {
    return (
        fetch(`${url}/users/${username}/templates/${templateID}/empty`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                return response.json();
            })
    );
};


// Used to store drafts. All drafts are stored under the same templateID, and are therefore stored inside arrays.
export const saveDraft = (username, templateID, draft) => {
    // In case an empty draft is given, it won't be saved in AsyncStorage.
    if (Object.keys(draft).length === 0) return;

    fetchDraftsByTemplateID(username, templateID)
        .then((drafts) => {
            // see if there is already a draft with the same id
            const draftIndex = drafts.findIndex(x => x.report_id === draft.report_id);

            if (draftIndex < 0) {
                drafts.push(draft);
            } else {
                drafts[draftIndex] = draft;
            }
            // give each draft a unique, negative id
            drafts.map((draft, i) => draft.report_id = -Math.abs(i + 1));
            saveData(`${url}/users/${username}/templates/${templateID}`, drafts);

            return (drafts[drafts.length - 1].report_id);
        });
};



/**
 * Saves unsent reports to array in AsyncStorage by templateID
 */
export const saveToQueueWithTemplateID = (username, templateID, report) => {
    fetchQueuedByTemplateID(username, templateID)
        .then(queue => {
            queue.push(report);
            saveData(`${url}/users/${username}/queue/${templateID}`, queue);
            return true;
        });
};

/**
 * Prints queue for testing purposes. Not really necessary :)
 * */
export const printQueueByID = (username, id) => {
    return AsyncStorage.getItem(`${url}/users/${username}/queue/${id}`)
        .then(data => {
            if (data != null) {
                const array = JSON.parse(data);
                for ( let i = 0; i < array.length; i++) {
                    console.log(array[i]);
                }
                return array;
            } else {
                console.log('empty array');
                return [];
            }
        });
};

/**
 *  Fetches array of unsent reports from AsyncStorage under specified templateID
 */
export const fetchQueuedByTemplateID = (username, templateID) => {
    return AsyncStorage.getItem(`${url}/users/${username}/queue/${templateID}`)
        .then(data => {
            if (data != null) {
                return JSON.parse(data);
            } else {
                return [];
            }
        });
};

export const removeDraft =  (username, templateID, draftID) => {
    fetchDraftsByTemplateID(username, templateID)
        .then((drafts) => {
            const draftRemoved = drafts.filter(draft => draft.report_id !== draftID);
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
            saveData(`${url}/users/${username}/templates/${templateID}/reports?sort=-date_created`, reports);
            return reports;
        });
};

/* Fetch Reports by TemplateID from ASyncStorage in case there is no internet connection.
   If no data has been stored an empty value will be returned. */
const fetchLocalReportsByTemplateID = (username, templateID) => {
    return AsyncStorage.getItem(`${url}/users/${username}/templates/${templateID}/reports?sort=-date_created`)
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
        fetch(`${url}/users/${username}/templates/${templateID}/reports?sort=-date_created`, {
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



/** Store data (layouts, reports - depending on the url) to ASyncStorage, a simple key-value storage system global to the app.
** Keys and values are stored as a string.
*/
const saveData = (dataUrl, data) => {
    AsyncStorage.setItem(dataUrl, JSON.stringify(data));
};

const removeData = (dataUrl) => {
    try {
        AsyncStorage.removeItem(dataUrl);
    } catch (error) {
        console.error(error);
    }
};

// Necessary because of a bug on iOS https://github.com/facebook/react-native/issues/8615#issuecomment-287977178?
/* Is this really necessary? TODO: Testing this change with the android peeps
    if (Platform.OS === 'ios') {
        return new Promise(resolve => {
            const handleFirstConnectivityChangeIOS = isConnected => {
                NetInfo.isConnected.removeEventListener('connectionChange', handleFirstConnectivityChangeIOS);
                resolve(isConnected);
            };
            NetInfo.isConnected.addEventListener('connectionChange', handleFirstConnectivityChangeIOS);
        });
    }
 */
export function isNetworkConnected() {

    return NetInfo.isConnected.fetch();
}
