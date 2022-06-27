import { Col } from 'rsuite'
import styled from 'styled-components'

const CardBox = styled.div`
margin-top: 5%;
display: flex;
flex-direction: column;
width: auto;
height: 23em;
background: ${props => props.theme.colors.lighter};
box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.02), 0px 4px 13px rgba(0, 0, 0, 0.03);
border-radius: 8px;
&:hover{
    transition: all 0.2s ease-in-out;
    text-decoration:none;
    box-shadow: 2px 8px 8px rgba(0, 0, 0, 0.04), 0px 8px 26px rgba(0, 0, 0, 0.03);
}
`
const Title = styled.p`
margin-top: 10%;
text-decoration: none;
font-weight: 700;
font-size: 1.2em;
&:hover{
    text-decoration:none;
}
`

const Description = styled.p`
font-size: 1.1em;
`


const Pic = styled.div`
    padding: 5%;
    opacity: 0.2;
    height: 40%;
`
const TextPart = styled.div`
    text-align: left;
    padding-left: 7%;
    padding-right: 7%;
    padding-bottom: 5%;
    font-family: 'Inder';
    background: ${props => props.theme.colors.light};
    color: ${props => props.theme.colors.text_secondary};
    height: 40%;
`

const Date = styled.div`
    position: absolute;
    left: 15;
    font-family: 'Inder';
    padding-left: 5px;
    padding-top: 5px;
    color: ${props => props.theme.colors.text_secondary};
`

const Button = styled.button`
    position: absolute;
    bottom: 0;
    margin-bottom: 10px;
    margin-left: 10px;
    opacity: 0.8;
    padding: 2%;
    transition: 0.1s;
    border-radius: 8px;
    :hover{
        background: ${props => props.theme.colors.medium};
    }
`



function ArticleCard({reference,description,title, pic, date}) {
// Dosypat zbytek metadat
// Lehká úprava

  return (  <>
  
  <Col xs={24} sm={12} md={8} lg={6}>      
        <CardBox>
            <Pic>{pic}</Pic>
                <TextPart>
                    <Title>{title}</Title>
                    <Description>{description}</Description>         
                </TextPart>
                <Button onClick={()=>{window.open(reference, "_blank")}}>Read article </Button>
                <Date>{date}</Date>
        </CardBox>
     </Col>
     </>
  );
}

export default ArticleCard;
