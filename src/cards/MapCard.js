
import styled from 'styled-components'

const CardBox = styled.div`
display: flex;
flex-direction: column;
width: 5rem;
height: 5rem;
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
margin-top: 10%;
text-decoration: none;
font-family: Inter;
font-style: normal;
font-size: 0.7rem;
line-height: 140%;
color: #302F35;
&:hover{
    text-decoration:none;
}
`


const Logo = styled.div`


`



function MapCard({reference, title, logo}) {



  return (
    
  
    <CardBox>
            <Title><a href={reference} target="_blank">{title}</a></Title>
            <Logo>{logo}</Logo>
     </CardBox>
  );
}

export default MapCard;
