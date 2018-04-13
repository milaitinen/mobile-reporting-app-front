import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { ReportEditingBackButton } from '../../src/components/ReportEditingBackButton/ReportEditingBackButton';

configure({ adapter: new Adapter() });

test('ReportEditingBackButton', () => {

    const dispatch = jest.fn();
    const component = shallow(
        <ReportEditingBackButton dispatch={dispatch} isUnsaved={true}/>
    );

    component.find('HeaderBackButton').simulate('press');
    expect(component).toMatchSnapshot();
});