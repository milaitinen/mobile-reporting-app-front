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
        <TemplateScreen templates={{}}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

describe('<TemplateScreen />', () => {
    describe('isLoading', () => {

        const templateScreen = shallow(<TemplateScreen templates={{}}/>);

        it('should render an <ActivityIndicator /> if true', () => {
            templateScreen.setState({ isLoading: true });
            expect(templateScreen.find(ActivityIndicator).length).toBe(1);
        });

        it('should not render an <ActivityIndicator /> if false', () => {
            templateScreen.setState({ isLoading: false });
            expect(templateScreen.find(ActivityIndicator).length).toBe(0);
        });
    });
});
