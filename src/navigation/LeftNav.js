import { useContext } from 'react';
import {Form, RadioGroup, Radio} from 'rsuite'
import styled from 'styled-components'
import { FilterContext } from '../contexts/FilterContext';


const Group = styled(RadioGroup)`
    background: red;
`



function LeftNav() {
const {appliedFilter, setAppliedFilter} = useContext(FilterContext);

// Set filter for whole group
const handleChange = (filter) => {
    setAppliedFilter(filter)
    console.log(appliedFilter)

}

const checkCurrentValue = () => {
    console.log(appliedFilter)
}
    return (
        <div>
        <Form.Group controlId="radioList">
            <Group  
                name="radioList"
                value={appliedFilter}
                onChange={value => {handleChange(value)}}
                >
            <p>Group1</p>
            <Radio value="A">Item A</Radio>
            <Radio value="B">Item B</Radio>
            <Radio value="C">Item C</Radio>
            </Group>
        </Form.Group>
        <Form.Group controlId="radioList">
            <Group  
                name="radioList"
                value={appliedFilter}
                onChange={value => {handleChange(value)}}
                >
            <p>Group1</p>
            <Radio value="A">Item A</Radio>
            <Radio value="B">Item B</Radio>
            <Radio value="C">Item C</Radio>
            </Group>
        </Form.Group>
        <Form.Group controlId="radioList">
            <Group  
                name="radioList"
                value={appliedFilter}
                onChange={value => {handleChange(value)}}
                >
            <p>Group1</p>
            <Radio value="A">Item A</Radio>
            <Radio value="B">Item B</Radio>
            <Radio value="C">Item C</Radio>
            </Group>
        </Form.Group>
        <Form.Group controlId="radioList">
            <Group  
                name="radioList"
                value={appliedFilter}
                onChange={value => {handleChange(value)}}
                >
            <p>Group1</p>
            <Radio value="A">Item A</Radio>
            <Radio value="B">Item B</Radio>
            <Radio value="C">Item C</Radio>
            </Group>
        </Form.Group>
        <button onClick={checkCurrentValue}>Check value</button>
        </div>
    );
}

export default LeftNav;


