
import styled from 'styled-components'
import { Badge } from 'rsuite';
import Github from '../images/Github.png'
import {Cardano} from '../icons/chain'

const Kontejner = styled.div`
  margin: 10%;
  @media (max-width: 768px) {
    margin: 1%;
  }
`

const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  padding: 24px;
  width: 15rem;
  height: 15rem;
  background: #D2D2D2;
  border: 1px solid #808080;
  box-sizing: border-box;
  border-radius: 15px;
  font-family: 'Spectral', serif;
cursor: pointer;
&:hover{
    transition: all 0.2s ease-in-out;
    text-decoration:none;
    box-shadow: 2px 8px 8px rgba(0, 0, 0, 0.04), 0px 8px 26px rgba(0, 0, 0, 0.03);
}
`
const Title = styled.p`
text-decoration: none;
font-family: 'NoBill';
font-style: normal;
font-weight: 600;
font-size: 1rem;
line-height: 140%;
min-height: 25%;
color: #302F35;
&:hover{
    text-decoration:none;
}
`

const Description = styled.p`
  font-family: 'Barlow Condensed', sans-serif;
  font-style: none;
  font-size: 15px;
  color: #767481;
  font-weight: 400;
`

const Tags = styled.div`
  display: flex;
  position: absolute;
  margin-top: 65%;
`

const Tag = styled.div`
  background: #442F17;
  border-radius: 15px;
  padding-left: 15%;
  padding-right: 15%;
  font-family: 'Courier Prime', monospace;
  font-family: 'Courier New';
  font-style: normal;
  font-weight: 400;
  color: white;
  font-size: 12px;
  margin-right: 7%;
`

const Date = styled.div`
  position: absolute;
  bottom: 0;
  margin-bottom: 3%;
`

const Info = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin-bottom: 2%;
  margin-right: 2%;
`

const Logo = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 15%;
`

const Reference = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`



function Card({title, description, update, reference, source, chain}) {
  // Tooltip 
  // Logos


  return (
    <Kontejner>    <Badge content="NEW">
  
    <CardBox>

                 <Title>{title}</Title>
                 <Description>{description}</Description>
                 <Tags><Tag>Tag1</Tag><Tag>Tag2</Tag></Tags>
                 <Date>{update}</Date>
                 <Info>{chain}</Info>
                 <Logo>{source}</Logo>
         
                 <Reference><a href={reference} target="_blank"><img src={Github} alt="Girl in a jacket" width="50" height="50"></img></a></Reference>

     </CardBox>

     </Badge>
     </Kontejner>

  );
}

export default Card;
