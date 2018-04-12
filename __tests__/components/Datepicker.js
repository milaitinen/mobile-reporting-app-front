import 'react-native';
import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import Datepicker from '../../src/components/Datepicker/Datepicker';

configure({ adapter: new Adapter() });
jest.mock('DatePickerIOS', () => 'DatePickerIOS');
Date.now = jest.fn(() => new Date(Date.UTC(2018, 4, 12)).valueOf());

describe('Datepicker component', () => {
    it('renders correctly on date mode', () => {
        const tree = renderer.create(
            <Datepicker editable={true} mode={'date'} answer={'2018-04-22'} onChange={jest.fn()} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly on time mode', () => {
        const tree = renderer.create(
            <Datepicker editable={true} mode={'time'} answer={'2018-04-23'} onChange={jest.fn()} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly when not editable', () => {
        const tree = renderer.create(
            <Datepicker editable={false} mode={'date'} answer={'2018-04-22'} onChange={jest.fn()} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

