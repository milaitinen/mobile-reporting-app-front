import 'react-native';
import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import { Layout } from '../../src/components/Layout/index';
import { Platform } from 'react-native';

configure({ adapter: new Adapter() });

jest.mock('Dimensions');

it('renders correctly', () => {
    const tree = renderer.create(
        <Layout />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

describe('Layout', () => {

    const wrapper = renderer.create(<Layout data={[]} />);   // render React components to pure JavaScript objects
    const inst = wrapper.getInstance();                      // Return the instance corresponding to the root element, if available.

    describe('toggle()', () => {
        inst.setTemplateScreenRenderFooter = jest.fn();
        inst.setTemplateScreenScrollEnabled = jest.fn();
        inst.moveToTop = jest.fn();
        inst.animateDropdownTo = jest.fn();

        it('should set state "expanded to true when called once', () => {
            inst.toggle();
            expect(inst.state.expanded).toBe(true);
        });

        it('should set state "expanded" to false when called twice', () => {
            inst.toggle();
            expect(inst.state.expanded).toBe(false);
        });
    });

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

    describe('setMaxHeight()', () => {
        it('should set the maximum height value correctly for IOS', () => {
            Platform.OS = 'ios';
            inst._setMaxHeight();
            expect(inst.state.maxHeight).toEqual(258);
        });

        it('should set the maximum height value correctly for Android', () => {
            Platform.OS = 'android';
            inst._setMaxHeight();
            expect(inst.state.maxHeight).toEqual(235);
        });

    });

    describe('showMore()', () => {
        /* Previous test interferes with the maxHeight value otherwise. */
        beforeEach(() => {
            inst.setState({ maxHeight: 475 });
        });

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




