import 'react-native';
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import Checkbox from '../../src/components/Checkbox/Checkbox';

configure({ adapter: new Adapter() });

describe('Checkbox tests', () => {
    it('renders correctly when not editable', () => {
        const tree = renderer.create(
            <Checkbox  title='some checkbox' editable={false} onPressFunction={jest.fn()}/>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly when editable', () => {
        const tree = renderer.create(
            <Checkbox  title='some checkbox' editable={true} onPressFunction={jest.fn()}/>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('calls the onPressFunction when pressed', () => {
        const mockPress = jest.fn();
        const checkbox = shallow(
            <Checkbox title='some checkbox' isChecked={false} editable={true} onPressFunction={mockPress}/>
        );

        const checkBox = checkbox.find('CheckBox');
        checkBox.simulate('press');
        expect(mockPress).toHaveBeenCalled();
    });
});
