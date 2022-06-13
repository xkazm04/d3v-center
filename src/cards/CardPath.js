import styled from 'styled-components'
import { chainData } from '../data/chainData';

const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  padding: 5%;
  background: #D2D2D2;
  border: 1px solid #808080;
  box-sizing: border-box;
  border-radius: 15px;
  font-family: 'Spectral', serif;
`


function CardPath({chain}) {

    const found = chainData.find(item => item.chain === chain.label)

    return (
        <CardBox>
               <p> {found.chain}</p>
        </CardBox>
    );
}

export default CardPath;


