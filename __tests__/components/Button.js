import { TouchableHighlight } from 'react-native';
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import Button from '../../src/components/Button/Button';

configure({ adapter: new Adapter() });

it('send button renders correctly', () => {
    const tree = renderer.create(
        <Button title='some button' type={'send'} onPress={jest.fn()} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

it('delete button renders correctly', () => {
    const tree = renderer.create(
        <Button title='delete button' type={'delete'} onPress={jest.fn()} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

it('save button renders correctly', () => {
    const tree = renderer.create(
        <Button title='delete button' type={'save'} onPress={jest.fn()} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

/*
it('renders only one text field when dateAccepted = null', () => {
    expect(shallow(<Button title='some button' type={'save'} onPress={jest.fn()} />).find(TouchableHighlight).length).toEqual(1);
});
*/



