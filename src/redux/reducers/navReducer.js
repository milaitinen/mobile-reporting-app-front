import Navigator from '../../navigation/AppNavigation';
import { NavigationActions } from 'react-navigation';


const initialNavState = Navigator.router.getStateForAction(NavigationActions.reset({
    index: 0,
    key: null,
    actions: [
        NavigationActions.navigate({
            routeName: 'loginStack',
        }),
    ],
}));


const navReducer = (state = initialNavState, action) => {
    const nextState = Navigator.router.getStateForAction(action, state);
    return nextState || state;
};

export default navReducer;