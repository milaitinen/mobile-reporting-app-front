import 'react-native';
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import Sidebar from '../../src/navigation/Sidebar';

configure({ adapter: new Adapter() });


const middlewares = [];
const mockStore = configureStore(middlewares);
const initialState = {};

describe('Sidebar', () => {
    const store = mockStore(initialState);
    const navigation = { state: { params: { isEditable: true } } };

    const sidebar = shallow(<Sidebar store={store} />);
    const wrapper = renderer.create(<Sidebar store={store} navigation={navigation}/>);
    const inst = wrapper.getInstance();

    it('should render correctly', () => {
        expect(wrapper.toJSON()).toMatchSnapshot();
    });

    it('signOut should work as expected', () => {
        inst.signOut();

    });

});