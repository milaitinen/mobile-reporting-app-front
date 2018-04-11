import 'react-native';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import { ActivityIndicator } from 'react-native';
import renderer from 'react-test-renderer';

import { TemplateScreen } from '../../src/screens/TemplateScreen';
import * as connectionTypes from '../../src/redux/actions/connection';
import * as reportsTypes from '../../src/redux/actions/reports';

configure({ adapter: new Adapter() });

describe('TemplateScreen', () => {

    const dispatch = jest.fn();
    const navigate = jest.fn();
    const navigation = { navigate: navigate };
    const templates = { 2: { template_id: 2, title: 'Some template' } };
    const reports = { 2: [{ report_id: 42, title: 'Some report' }] };
    const templateScreen = shallow(<TemplateScreen templates={{}} dispatch={dispatch} navigation={navigation} />);
    const wrapper = renderer.create(
        <TemplateScreen templates={templates} reports={reports} dispatch={dispatch} navigation={navigation} />
    );


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

    it('if isEditable=false createNew() should call this.props.navigation.navigate("Preview", ...)', () => {
        const inst = wrapper.getInstance();

        inst.createNew(1, false);
        expect(navigate).toHaveBeenCalledWith('Preview', {
            refresh: inst.handleRefresh,
            isEditable: false
        });
    });

    it('if isEditable=true createNew() should call this.props.navigation.navigate("NewReport", ...)', () => {
        const inst = wrapper.getInstance();

        inst.createNew(1, true);
        expect(navigate).toHaveBeenCalledWith('NewReport', {
            templateID: 1,
            refresh: inst.handleRefresh,
            isEditable: true
        });
    });

    it('viewReport() call this.props.navigation.navigate("Report", ...)', () => {
        const inst = wrapper.getInstance();

        inst.viewReport(1, 2, 'some title');
        expect(navigate).toHaveBeenCalledWith('Report', {
            refresh: inst.handleRefresh,
            templateID: 1,
            reportID: 2,
            title: 'some title'
        });
    });

    it('dispatches toggleConnection when calling handleConnectionChange', () => {
        const inst = wrapper.getInstance();

        inst.handleConnectionChange(true);
        expect(dispatch).toHaveBeenCalledWith({ type: connectionTypes.TOGGLE_CONNECTION, isConnected: true });
    });

    it('getDraft', async () => {

        jest.unmock('../../src/screens/api');
        const api = require.requireActual('../../src/screens/api');
        api.fetchDraftsByTemplateID = jest.fn(() => {
            return new Promise(resolve => resolve([{ report_id: -1, title: 'draft1' }]));
        });

        const inst = wrapper.getInstance();
        await inst.getDrafts();
        expect(dispatch).toHaveBeenCalledWith({
            type: reportsTypes.STORE_DRAFT_BY_TEMPLATE_ID,
            templateID: 2,
            draft: { report_id: -1, title: 'draft1' }
        });
    });
});
