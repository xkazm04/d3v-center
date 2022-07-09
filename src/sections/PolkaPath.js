import styled from "styled-components";
import { ArrowIcon } from "../icons/nav";
import {Grid, Row, Col} from 'rsuite'
import {useState} from 'react'

const Kontejner = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    height: 100%;
    background: #2f2f2f;
    padding: 3%;
`

const FormBox = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2%;
    margin-left: 5%;
    text-align: left;
    border: 1px solid #e6007a;
    border-radius: 15px;
    @media (max-width: 1000px) {
      width: 100%;
      margin: 0;
  }
`

const ArticleButton = styled.button`
  border: 1px solid ${props => props.theme.colors.text_primary};
  border-radius: 15px;
  font-weight: 700;
  margin: 5px;
  color: ${props => props.theme.colors.text_primary};
  transition: 0.1s;
  height: 30px;
  font-family: 'Spectral', serif;
  background: #e6007a;
  animation: fadeIn 0.5s;
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  &:hover{
    background: ${props => props.theme.colors.green};
  }
`



const ArticleActButton = styled(ArticleButton)`
  background: #e6007a;
  &:hover{
    background:  ${props => props.theme.colors.step};
  }
`

const Navigation = styled.div`
    display: flex;
`

const Section = styled.div`
    display: flex;
    margin: 2%;
`

const Code = styled.code`
    color: white;
`

const Title = styled.div`
     color: #e6007a;
     font-family: 'NoBill';
    font-size: 2.5rem;
    align-self: center;
`




  
export default function PolkaPath() {
    const [hidden, setHidden] = useState(true)
    
    const StepIcon =  <ArrowIcon color='#e6007a' width='30px' height='30px'/>
    const toggleHidden = () => {
        setHidden(!hidden)
    }
    return <><Kontejner>
                <Title> POLKADOT</Title>
        <Navigation>   <ArticleActButton>Button</ArticleActButton> {StepIcon} <ArticleActButton>Button</ArticleActButton>  {StepIcon}  <ArticleActButton>Button</ArticleActButton></Navigation>
        <Section>
            <FormBox>
                <ArticleButton onClick={toggleHidden}>Step1</ArticleButton>
                <ArticleButton>Step1</ArticleButton>
                <ArticleButton>Step1</ArticleButton>
            </FormBox>
            <FormBox>
        {hidden ? null : <>
                <ArticleButton>Step1</ArticleButton>
                <ArticleButton>Step1</ArticleButton>
                <ArticleButton>Step1</ArticleButton>
                </>
            }
        </FormBox>
        </Section>
        <Section>
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <FormBox>
                                <ArticleButton>Step1</ArticleButton>
                            </FormBox>
                        </Col>
                        <Col xs={12}>
                            <FormBox>
                                <ArticleButton>Step1</ArticleButton>
                            </FormBox>
                        </Col>
                    </Row>
                </Grid>
        </Section>
        <Section>
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <FormBox>
                               <pre><Code>Code</Code> </pre>
                            </FormBox>
                        </Col>
                        <Col xs={12}>
                            <FormBox>
                                 <pre><Code>Articles</Code> </pre>
                            </FormBox>
                        </Col>
                    </Row>
                </Grid>
        </Section>
    </Kontejner>
    </>
  }