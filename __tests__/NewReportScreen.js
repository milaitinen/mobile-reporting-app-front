import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'isomorphic-fetch';
import { shallow } from 'enzyme';
import { ActivityIndicator } from 'react-native';

import { NewReportScreen } from '../src/screens/NewReportScreen';
import { url } from '../src/screens/urlsetting';

configure({ adapter: new Adapter() });

describe('New report screen', () => {
    it('renders correctly', () => {
        const componentDidMountMock = jest.fn();
        const tree = renderer.create(
            <NewReportScreen />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('fetch finds data from the server', () => {
        const data = fetch(url + '/users/1/forms');
        const userData = fetch(url + '/users/1');

        expect(userData).not.toBe(null);
        expect(data).not.toBe(null);
    });

    describe('<NewReportScreen />', () => {
        describe('isLoading', () => {
            it('should render a <ActivityIndicator /> if true', () => {
                const templateScreen = shallow(<NewReportScreen />);
                templateScreen.setState({ isLoading: true });
                expect(templateScreen.find(ActivityIndicator).length).toBe(1);
            });
        });
    });
});

