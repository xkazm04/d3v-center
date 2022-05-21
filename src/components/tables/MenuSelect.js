import styled from 'styled-components';

const MySelect = styled.select`
    background: none;
    min-width: 70px;
    outline: none;
    border:none;
    font-size: 12px;
    box-shadow: 2 2 2 0 white;
    padding-left: 3%;
    padding-right: 3%;
    color: ${props => props.theme.colors.text_secondary};
    cursor: pointer;
    border-radius: 5px;
    box-shadow: 0px 1px 1px white;
    transition: 0.2s;
    &:hover{
        background: ${props => props.theme.colors.lighter};
    }
    &:focus{
    box-shadow: 0px 1px 1px white;
  }
`

const MyOption = styled.option`
    background: ${props => props.theme.colors.yellow};
    color: ${props => props.theme.colors.text_secondary};
    font-size: 14px;
    font-family: 'NoBill';
    letter-spacing: 1.4px;
    background: ${props => props.theme.colors.background};
    
    &:hover{
        background: ${props => props.theme.colors.lighter};
        cursor: pointer;
    }
    
`


const MenuSelect = ({ items, currentRefinement, refine }) => {
    return (<> <MySelect
      value={currentRefinement || ''}
      onChange={event => refine(event.currentTarget.value)}
    >
 
      <MyOption value="">All</MyOption>
    
      {items.map(item => (
        <MyOption
          key={item.label}
          value={item.isRefined ? currentRefinement : item.value}
        >
          {item.label}
        </MyOption>
      ))}
         
    </MySelect> </>

  );
      }
export default MenuSelect