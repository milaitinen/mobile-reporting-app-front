import React from 'react';
import { StatusBar } from 'react-native';


let statusBar = null;
//for some reason i couldn't get this to work the right way : D
if (this.props.isConnected) {
    statusBar = <StatusBar backgroundColor="#b52424" barStyle="light-content" />;
} else {
    statusBar = <StatusBar backgroundColor="#3d4f7c" barStyle="light-content" />;
}

export default statusBar;

// old version that displayed a red block on top of the creen that said "No Internet Connection"

//import { View, Text, Dimensions, } from 'react-native';
//import styles from "./styles";
//const { width } = Dimensions.get("window");
// const OfflineNotice = () => {
//     return (
//         <View style={[styles.offlineContainer, { width: width }]}>
//             <Text style={styles.offlineText}>No Internet Connection</Text>
//         </View>
//     );
// };
//export default statusBar;
