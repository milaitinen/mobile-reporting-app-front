import 'react-native';
import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import { Layout } from '../src/components/Layout';

configure({ adapter: new Adapter() });

it('renders correctly', () => {
    const tree = renderer.create(
        <Layout data={[]} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

describe('Layout', () => {

    const wrapper = renderer.create(<Layout data={[]} />);   // render React components to pure JavaScript objects
    const inst = wrapper.getInstance();                      // Return the instance corresponding to the root element, if available.

    describe('toggleExpanded()', () => {
        it('should set state "expanded" to true when called once', () => {
            inst.toggleExpanded();
            expect(inst.state.expanded).toBe(true);
        });
        it('should set state "expanded" to false when called twice', () => {
            inst.toggleExpanded();
            expect(inst.state.expanded).toBe(false);
        });
    });

    describe('showMore()', () => {
        it('should update the states itemsCount, updated, and maxHeight, when called', () => {
            expect(inst.state.itemsCount).toBe(20);
            expect(inst.state.updated).toBe(false);
            expect(inst.state.maxHeight).toBe(475);

            inst.showMore();

            expect(inst.state.itemsCount).toBe(40);
            expect(inst.state.updated).toBe(true);
        });
    });
});




