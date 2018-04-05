import 'react-native';
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import sinon from 'sinon';

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

    it('renders odd rows correctly', () => {
        const row = inst.renderRow('test1', 1, false);
        const render = renderer.create(row).toJSON();
        expect(render).toMatchSnapshot();
    });

    it('renders even rows correctly', () => {
        const row = inst.renderRow('test2', 2, true);
        const render = renderer.create(row).toJSON();
        expect(render).toMatchSnapshot();
    });

    it('renders row with selected value correctly', () =>{
        inst.setState({ value: 'test1' });
        const row = inst.renderRow('test1', 1, false);
        const render = renderer.create(row).toJSON();
        expect(render).toMatchSnapshot();
    });

    it('should render separator between rows', () => {
        const separator = inst.renderSeparator(0);
        expect(separator).toBeDefined();
    });

    it('should not render the separator after the last row', () => {
        const separator = inst.renderSeparator(1);
        expect(separator).toBeUndefined();
    });

    it('should call onSelect() appropriately', () => {
        const spy = sinon.spy(Dropdown.prototype, 'onSelect');
        const wrapper = shallow(<Dropdown disabled={false} defaultValue={'some value'} options={['test1', 'test2']} />);
        wrapper.find('ModalDropdown').simulate('select');
        expect(spy.calledOnce).toEqual(true);

    });

    describe('onSelect(0, "test1")', () => {
        it('should set state value to test1 when called', () => {
            inst.onSelect(0, 'test1');
            expect(inst.state.value).toBe('test1');
        });
    });

});





