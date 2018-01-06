import { AsyncStorage, NetInfo, Platform } from 'react-native';


/*
componentDidMount() {
    getPeople()
      .then(response => this.setState({ people: response.results }))
      .catch(error => alert(error));
  }
 */


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

const getLocalLayoutsData = (url) => {
    return AsyncStorage.getItem(url)
        .then(data => {
            if (data !== null) {
                return JSON.parse(data);
            } else {
                return [];
            }
        });
};

const saveData = (url, data) => {
    AsyncStorage.setItem(url, JSON.stringify(data));
};

const getRemoteLayoutsData = (url) => {
    return (
        fetch(url)
            .then(response => {
                return response.json();
            })
    );
};

export const getLayouts = () => {
    const url = 'http://aaltodev.arter.fi:8080/';
    const layoutUrl = url + 'layouts';

    return isNetworkConnected()
        .then((isConnected) => {
            if (!isConnected) {
                return getLocalLayoutsData(layoutUrl);
            }
            return getRemoteLayoutsData(layoutUrl);
        })
        .then((data) => {
            saveData(url, data);
            return data;
        });
};
