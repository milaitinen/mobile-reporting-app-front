import 'react-native';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import { ActivityIndicator } from 'react-native';
import renderer from 'react-test-renderer';

import { TemplateScreen } from '../../src/screens/TemplateScreen';

configure({ adapter: new Adapter() });

describe('TemplateScreen', () => {

    const templateScreen = shallow(<TemplateScreen templates={{}}/>);
    const wrapper = renderer.create(<TemplateScreen templates={{}}/>);
    const inst = wrapper.getInstance();

    it('renders correctly', () => {
        const tree = wrapper.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should set state refreshing = true when handleRefresh is called', () => {

        jest.mock('../src/screens/api', () => {
            return {
                fetchReportsByTemplateID: jest.fn(),
                fetchTemplatesByUsername: jest.fn(),
                fetchDraftsByTemplateID: jest.fn()
            };
        });

        inst.getTemplatesAndReport = jest.fn();
        inst.handleRefresh();
        expect(inst.state.refreshing).toBe(true);
    });

    it('should set state scrollEnabled to true when called setScrollEnabled(true)', () => {
        inst.setScrollEnabled(true);
        expect(inst.state.scrollEnabled).toBe(true);
    });

    it('should set state renderFooter to false when called setRenderFooter(false)', () => {
        inst.setRenderFooter(false);
        expect(inst.state.renderFooter).toBe(false);
    });

    it('should render an ActivityIndicator if isLoading = true', () => {
        templateScreen.setState({ isLoading: true });
        expect(templateScreen.find(ActivityIndicator).length).toBe(1);
    });

    it('should not render an ActivityIndicator if isLoading = false', () => {
        templateScreen.setState({ isLoading: false });
        expect(templateScreen.find(ActivityIndicator).length).toBe(0);
    });
});
