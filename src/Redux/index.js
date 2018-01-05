import  { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import AppNavigation from '../navigation/AppNavigation';

const navReducer = (state, action) => {
    const newState = AppNavigation.router.getStateForAction(action, state)
    return newState || state
}

export default () => {
    //assemble reducers
    const rootReducer = combineReducers({
        nav: navReducer
    })
    return createStore(rootReducer)
}
