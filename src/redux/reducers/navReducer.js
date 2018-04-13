import Navigator, { LOGGED_OUT_ROUTE_NAME } from '../../navigation/AppNavigation';
import { NavigationActions } from 'react-navigation';


const initialNavState = Navigator.router.getStateForAction(NavigationActions.reset({
    index: 0,
    key: null,
    actions: [
        NavigationActions.navigate({
            routeName: LOGGED_OUT_ROUTE_NAME,
        }),
    ],
}));


const navReducer = (state = initialNavState, action) => {
    const nextState = Navigator.router.getStateForAction(action, state);
    return nextState || state;
};

export default navReducer;