import { Cosmos, Elrond, Evm, Near, Polkadot, Solana, Ziliqa } from '../../icons/chain';
import styled from 'styled-components';
import {  Highlight} from 'react-instantsearch-dom';
import axios from 'axios';

const Kontejner = styled.div`

`

const HitMainColumn = styled.div`
background: ${props => props.theme.colors.main};
height: 80px;
border-radius: 15px;
margin: 5px;
text-align: left;
box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.75);
width: 210px;
padding: 5%;
@media (max-width: 700px) {
    margin-left: 0;
    border-radius: 0;
  }
  &:hover{
      background: ${props => props.theme.colors.red};
      cursor: pointer;
  }
`


const HitTitle = styled(Highlight)`
  color: ${props => props.theme.colors.text_title};
  font-family: 'auto';
  font-weight: 700;
  font-size: 1.1em;
`

const HitDescription = styled(Highlight)`
  display: none;
`
const SlicedDescription = styled.div`
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

const TopLayer= styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`





const DevelopCards = ({ hit }) => {
    const slicedDescription = (hit.Description).slice(0,55) + '...';
    const handleResultClick = (reference,id,counter) => {
        window.open(reference, "_blank")
        addCounter(id,counter)
    }
    const addCounter = async(tutorialId,viewCounter) => {
        const updatedId = tutorialId.match(/\d+/)[0] // Extract id from string
        console.log(updatedId)
        const token = process.env.REACT_APP_CMS_API // Master strapi token
        const body = { data: { ViewCounter: viewCounter+1 } }
        const res = await axios.put(`https://d3v-center.herokuapp.com/api/tools/${updatedId}`, body, {
            headers: {
              Authorization: `Bearer ${token}`
            },
    })
    console.log(res)
  }
  

  const Part = <><HitMainColumn onClick={()=>{handleResultClick(hit.Reference,hit.id,hit.ViewCounter)}}>  
  <TopLayer> <HitTitle attribute="Title" hit={hit}  tagName="strong"/>
  
          {hit.Chain === 'EVM' ? <Evm width={'25'}/> : null}
          {hit.Chain === 'Solana' ? <Solana width={'25'}/> : null}
          {hit.Chain === 'Near' ? <Near width={'25'}/> : null}
          {hit.Chain === 'Ziliqa' ? <Ziliqa width={'25'}/> : null}
          {hit.Chain === 'Polkadot' ? <Polkadot width={'25'}/> : null}
          {hit.Chain === 'Elrond' ? <Elrond width={'25'}/> : null}
          {hit.Chain === 'Cosmos' ? <Cosmos width={'25'}/> : null}
  </TopLayer>
    <SlicedDescription> {slicedDescription}</SlicedDescription>
      <HitDescription attribute="Description" hit={hit} tagName="strong" /> 
  </HitMainColumn>
  </>

    return  <Kontejner>
        {hit.Usage === 'Library' ? <>{Part}</> : null }

    </Kontejner>
};

export default DevelopCards