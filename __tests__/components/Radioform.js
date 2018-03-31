import 'react-native';
import React from 'react';
import { /*shallow,*/ configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import Radioform from '../../src/components/Radioform/Radioform';

configure({ adapter: new Adapter() });

const options = [
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
];

describe('Radioform component', () => {
    it('renders correctly', () => {
        const tree = renderer.create(
            <Radioform
                options={options}
                editable={true}
                initial={0}
                itemRealKey='value'
                onPress={jest.fn()}
            />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('works as expected when press function called', () => {
        const radioform = renderer.create(
            <Radioform
                options={options}
                editable={true}
                initial={0}
                itemRealKey='value'
                onPress={jest.fn()}
            />
        ).getInstance();
        radioform.press('Option 1');
        expect(radioform.state.value).toEqual('Option 1');
    });

    /* TODO: test pressing label and button
    it('works as expected when radio button pressed', () => {

        const radioform = shallow(
            <Radioform
                options={options}
                editable={true}
                initial={0}
                itemRealKey='value'
                onPress={jest.fn()}
            />
        );

        const render = radioform.dive();
        render.find('RadioButtonInput').forEach(child => {
            child.simulate('press');
        });
    });

    /*it('works as expected when label pressed', () => {
        const radioform = shallow(
            <Radioform
                options={options}
                editable={true}
                initial={0}
                itemRealKey='value'
                onPress={jest.fn()}
            />
        );

        const render = radioform.dive();
        const radioButtonLabel = render.find('RadioButtonLabel');

        radioButtonLabel.forEach(child => {
            child.simulate('press');
            expect(radioform).toEqual(child.obj);
        });


    });*/

});

