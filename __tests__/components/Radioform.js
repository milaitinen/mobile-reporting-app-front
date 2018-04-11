import 'react-native';
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import sinon from 'sinon';

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
    const radioform = renderer.create(<Radioform
        options={options}
        editable={true}
        initial={0}
        itemRealKey='value'
        onPress={jest.fn()}
    />);

    const inst = radioform.getInstance();

    it('renders correctly', () => {
        expect(radioform.toJSON()).toMatchSnapshot();
    });

    it('works as expected when press function called', () => {
        inst.press(2);
        expect(inst.state.index).toEqual(2);
    });
});

describe('Radioform presses', () => {
    const spy = sinon.spy(Radioform.prototype, 'press');
    const radioform = shallow(
        <Radioform
            options={options}
            editable={true}
            initial={0}
            itemRealKey='value'
            onPress={jest.fn()}
        />
    );

    it('work as expected when radio button pressed', () => {
        radioform.find('RadioButtonInput').forEach(child =>{
            child.simulate('press');
            expect(spy.called).toEqual(true);
        });
    });

    it('work as expected when radio label pressed', () => {
        radioform.find('RadioButtonLabel').forEach(child =>{
            child.simulate('press');
            expect(spy.called).toEqual(true);
        });
    });
});

