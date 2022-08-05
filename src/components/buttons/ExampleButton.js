import styled from 'styled-components'

const Button = styled.button`
    color: ${props => props.theme.colors.text_primary};
    background: ${props => props.theme.colors.lighter};
    border-radius: 15px;
    box-shadow: 0px 0px 5px 0px ${props => props.theme.colors.medium};
    transition: 0.1s;
    &:hover{
        box-shadow: 0px 0px 5px 0px ${props => props.theme.colors.heavy};
    }
`

const ExampleButton = ({label, click, param}) => {
    return <><Button onClick={()=>{click(param)}}>{label}</Button> </>
}

export default ExampleButton