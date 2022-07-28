import styled from 'styled-components'

const Button = styled.button`
    background: inherit;
    color: ${props => props.theme.colors.text_primary};
    background: ${props => props.theme.colors.lighter};
`

const ExampleButton = ({label, click, param}) => {
    return <><Button onClick={()=>{click(param)}}>{label}</Button> </>
}

export default ExampleButton