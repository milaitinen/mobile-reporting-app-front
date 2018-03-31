import 'react-native';
import { Platform } from 'react-native';
import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import { OfflineNotice } from '../../src/components/OfflineNotice/OfflineNotice';
import { mapStateToProps } from '../../src/components/OfflineNotice/OfflineNotice';

configure({ adapter: new Adapter() });
jest.mock('StatusBar', () => 'StatusBar');

describe('Offline notice component', () => {

    it('renders correctly for android', () => {
        Platform.OS = 'android';
        const tree = renderer.create(
            <OfflineNotice isConnected={true} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly for IOS', () => {
        Platform.OS = 'ios';
        const tree = renderer.create(
            <OfflineNotice isConnected={true} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly without a connection', () => {
        const tree = renderer.create(
            <OfflineNotice isConnected={false} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should show connected value', () => {
        const initialState = {
            connection: {
                isConnected: true
            }
        };
        expect(mapStateToProps(initialState).isConnected).toEqual(true);
    });
});

