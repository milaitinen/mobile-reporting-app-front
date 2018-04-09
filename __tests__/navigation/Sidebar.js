import 'react-native';
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import sinon from 'sinon';

import { Sidebar } from '../../src/navigation/Sidebar';

configure({ adapter: new Adapter() });

describe('Sidebar', () => {
    const dispatch = jest.fn();
    const navigation = { state: { params: { isEditable: true } }, dispatch: dispatch };
    const wrapper = renderer.create(<Sidebar navigation={navigation}/>);

    it('should render correctly', () => {
        expect(wrapper.toJSON()).toMatchSnapshot();
    });

    it('should call signOut() when Sign out button pressed', () => {
        const spy = sinon.spy(Sidebar.prototype, 'signOut');
        const sidebar = shallow(<Sidebar dispatch={dispatch} navigation={navigation} />);
        sidebar.find('Button').simulate('press');
        expect(spy.called).toEqual(true);
    });

});