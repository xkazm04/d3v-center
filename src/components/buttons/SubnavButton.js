import styled from 'styled-components'

const Button = styled.button`
  font-family: 'Staatliches';
  font-size: 1.4em;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-top: 1%;
  margin-right: 10px;
  background: ${props => props.theme.colors.medium};
  @media (max-width: 700px) {
        font-size: 1.1em;
        padding: 5px;
  }
`

const ActButton = styled(Button)`
  background: ${props => props.theme.colors.lightGreen};
  color: ${props => props.theme.colors.text_title};
`

const SubnavButton = ({phase, item, setItem}) => {
    return <>   {phase === item ? <ActButton>{item}</ActButton> : <Button onClick={()=>setItem(item)}>{item}</Button>}</>
}

export default SubnavButton;