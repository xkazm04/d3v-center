
import styled from 'styled-components'
import { Badge } from 'rsuite';


const CardBox = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
text-align: left;
padding: 24px;
width: 15rem;
height: 15rem;
background: #FFFFFF;
box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.02), 0px 4px 13px rgba(0, 0, 0, 0.03);
border-radius: 8px;
cursor: pointer;
&:hover{
    transition: all 0.2s ease-in-out;
    text-decoration:none;
    box-shadow: 2px 8px 8px rgba(0, 0, 0, 0.04), 0px 8px 26px rgba(0, 0, 0, 0.03);
}
`
const Title = styled.p`
text-decoration: none;
font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 1rem;
line-height: 140%;
color: #302F35;
&:hover{
    text-decoration:none;
}
`

const Description = styled.p`
font-family: Inter;
font-style: normal;
font-weight: normal;
font-size: 14px;
color: #767481;
`

const Date = styled.div`
  position: absolute;
  bottom: 0;
  margin-bottom: 2%;
`

const Info = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin-bottom: 2%;
  margin-right: 2%;
`

const Logo = styled.div`
  margin-top: 15%;
  position: absolute;
  top: 0;
  right: 0;

`

const Reference = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`



function Card({title, description, update, reference, source, chain}) {
  // title={data.attributes.Title} 
  // description={data.attributes.Description} 
  // update={data.attributes.Update}
  // reference={data.attributes.Reference}
  // type={data.attributes.Type}
  // chain={data.attributes.Chain}

  // Tooltip 
  // Logos
  // Filtr 


  return (
    
    <Badge content="NEW">
  
    <CardBox>

                 <Title>{title}</Title>
                 <Description>{description}</Description>
                 <Date>{update}</Date>
                 <Info>{chain}</Info>
                 <Logo>{source}</Logo>
                 <Reference><a href={reference} target="_blank">Logo</a></Reference>

     </CardBox>

     </Badge>
  );
}

export default Card;
