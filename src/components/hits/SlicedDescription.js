import styled from 'styled-components';

const Div = styled.div`
  color: ${props => props.theme.colors.text_primary};
  font-family: 'Helvetica';
  font-size: 0.7rem;
  font-weight: 500;
  opacity: 0.6;
  transition: 0.1s;
  &:hover{
    opacity: 1;
  }
`


const SlicedDescription = ({content}) => {
    return (
        <Div>{content}</Div>
    )
}

export default SlicedDescription