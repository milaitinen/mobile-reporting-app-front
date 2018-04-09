import React from 'react';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';

import ReportEditingBackButton from '../../src/components/ReportEditingBackButton/ReportEditingBackButton';

configure({ adapter: new Adapter() });

describe('ReportEditingBackButton', () => {
    const mockStore = configureStore();
    const initialState = {
        state: {
            reportEditing: {
                isUnsaved: true
            }
        }
    };
    const dispatch = jest.fn();
    const store = mockStore(initialState);


    it('should render correctly', () => {
        const tree = renderer.create(<ReportEditingBackButton store={store} dispatch={dispatch} isUnsaved={true}/>);
        expect(tree.toJSON()).toMatchSnapshot();
    });
});