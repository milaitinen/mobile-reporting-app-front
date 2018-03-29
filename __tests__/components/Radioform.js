import 'react-native';
import React from 'react';
//import { configure } from 'enzyme';
//import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import Radioform from '../../src/components/Radioform/Radioform';

//configure({ adapter: new Adapter() });

it('renders correctly', () => {
    const tree = renderer.create(
        <Radioform
            options={[
                {
                    label: 'Option 1',
                    value: {
                        field_option_id: 1,
                        field_id: 3,
                        value: 'Option 1'
                    }
                },
                {
                    label: 'Option 2',
                    value: {
                        field_option_id: 2,
                        field_id: 3,
                        value: 'Option 2'
                    }
                }
            ]}
            editable={true}
            initial={0}
            itemRealKey='value'
            onPress={jest.fn()}
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
