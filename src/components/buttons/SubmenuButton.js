import styled from 'styled-components'

const ArticleButton = styled.button`
  border: 1px solid ${props => props.theme.colors.text_primary};
  border-radius: 15px;
  font-weight: 700;
  margin: 5px;
  color: ${props => props.theme.colors.text_primary};
  transition: 0.1s;
  height: 30px;
  font-size: 1em;
  font-family: 'Spectral', serif;
  background: ${props => props.theme.colors.subContent};
  &:hover{
    background: ${props => props.theme.colors.green};
  }
`

const ArticleActButton = styled(ArticleButton)`
  background: ${props => props.theme.colors.step};
  &:hover{
    background:  ${props => props.theme.colors.step};
  }
`

const SubmenuButton = ({phase, item, setItem}) => {
    return <>   {phase === item ? <ArticleActButton>{item}</ArticleActButton> : <ArticleButton onClick={()=>setItem(item)}>{item}</ArticleButton>}</>
}

export default SubmenuButton;