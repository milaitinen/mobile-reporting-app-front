import 'react-native';
import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import Dropdown from '../../src/components/Dropdown/Dropdown';

configure({ adapter: new Adapter() });

describe('Dropdown', () => {

    const wrapper = renderer.create(<Dropdown disabled={false} defaultValue={'some value'} options={['test1', 'test2']} />);
    const inst = wrapper.getInstance();

    it('renders correctly when not disabled', () => {
        const tree = wrapper.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly when disabled', () => {
        const tree = renderer.create(
            <Dropdown
                disabled={true}
                defaultValue={'some value'}
                options={['test1', 'test2']} />
        ).toJSON();
        expect(tree).toMatchSnapshot();

    });

    describe('onSelect(0, "test1")', () => {
        it('should set state value to test1 when called', () => {
            inst.onSelect(0, 'test1');
            expect(inst.state.value).toBe('test1');
        });
    });

});





