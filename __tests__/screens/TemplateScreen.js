import 'react-native';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import { ActivityIndicator } from 'react-native';
import renderer from 'react-test-renderer';

import { TemplateScreen } from '../../src/screens/TemplateScreen';
import * as previewTypes from '../../src/redux/actions/preview';

configure({ adapter: new Adapter() });

describe('TemplateScreen', () => {

    const dispatch = jest.fn();
    const navigate = jest.fn();
    const navigation = { navigate: navigate };
    const templateScreen = shallow(<TemplateScreen templates={{}} dispatch={dispatch} navigation={navigation} />);
    const wrapper = renderer.create(<TemplateScreen templates={{}} dispatch={dispatch} navigation={navigation} />);

    it('renders correctly', () => {
        const tree = wrapper.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should set state refreshing=true when handleRefresh is called', () => {

        const inst = wrapper.getInstance();

        jest.mock('../../src/screens/api', () => {
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
        const inst = wrapper.getInstance();

        inst.setScrollEnabled(true);
        expect(inst.state.scrollEnabled).toBe(true);
    });

    it('should set state renderFooter to false when called setRenderFooter(false)', () => {
        const inst = wrapper.getInstance();

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

    it('if isEditable=false createNew should call this.props.navigation.navigate("Preview", ...)', () => {
        const inst = wrapper.getInstance();

        inst.createNew(1, false);
        expect(navigate).toHaveBeenCalledWith('Preview', {
            refresh: inst.handleRefresh,
            isEditable: false });
    });

    it('if isEditable=true createNew should call this.props.navigation.navigate("NewReport", ...)', () => {
        const inst = wrapper.getInstance();

        inst.createNew(1, true);
        expect(navigate).toHaveBeenCalledWith('NewReport', {
            templateID: 1,
            refresh: inst.handleRefresh,
            isEditable: true });
    });
});
