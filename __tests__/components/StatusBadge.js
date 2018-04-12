import { Text } from 'react-native';
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import StatusBadge from '../../src/components/StatusBadge/StatusBadge';

configure({ adapter: new Adapter() });

it('renders one text field when isDraft = true', () => {
    expect(shallow(<StatusBadge dateAccepted='2018-04-01' isDraft={true}/>).find(Text).length).toEqual(1);
});

it('renders two text fields when dateAccepted is not null', () => {
    expect(shallow(<StatusBadge dateAccepted='2018-04-01' isDraft={false}/>).find(Text).length).toEqual(1);
});

it('renders only one text field when dateAccepted = null', () => {
    expect(shallow(<StatusBadge dateAccepted={null} isDraft={false}/>).find(Text).length).toEqual(1);
});

