import 'react-native';
import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import { OfflineNotice } from '../../src/components/OfflineNotice/OfflineNotice';

configure({ adapter: new Adapter() });

it('renders correctly', () => {
    const tree = renderer.create(
        <OfflineNotice isConnected={true} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
