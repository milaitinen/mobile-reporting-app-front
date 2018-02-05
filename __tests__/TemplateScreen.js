import 'react-native';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import { ActivityIndicator } from 'react-native';
import renderer from 'react-test-renderer';

import { TemplateScreen } from '../src/screens/TemplateScreen';

configure({ adapter: new Adapter() });

it('renders correctly', () => {
    const tree = renderer.create(
        <TemplateScreen />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});


describe('<TemplateScreen />', () => {
    describe('isLoading', () => {
        it('should render a <ActivityIndicator /> if true', () => {
            const templateScreen = shallow(<TemplateScreen />);
            templateScreen.setState({ isLoading: true });
            expect(templateScreen.find(ActivityIndicator).length).toBe(1);
        });
    });
});
