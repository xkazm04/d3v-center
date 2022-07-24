import {useState, useEffect} from 'react'
import styled from 'styled-components'
import {Divider} from 'rsuite'
import axios from 'axios'
import CodeComponent from '../components/code/CodeComponent'
import Md from '../components/code/Md'

const Kontejner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 15%;
    margin-right: 15%;
    margin-top: 5%;
    background: #f9fff8;
    border-radius: 15px;
    padding-bottom: 2%;
`

const TitleBox = styled.div`
    border: 1px solid ${props => props.theme.colors.line};
    border-radius: 15px;
    width: 100%;
    padding: 1%;
    background: linear-gradient(270deg, ${props => props.theme.colors.landingBox} 100%, #00574B 0%);
    animation: fadeIn 0.5s;
    margin-bottom: 1%;
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
    @media (max-width: 700px) {
        width: 100%;
  }
`

const TitleSubBox = styled(TitleBox)`
    padding-bottom: 2%;
    border-radius: 0px;
    display: flex;
    justify-content: center;
`

const SectionButton = styled.button`
    background: inherit;
    color: ${props => props.theme.colors.primary};
    color: #d7fff2;
    font-size: 1.2em;
    font-family: 'Staatliches';
    letter-spacing: 1px;
    transition: 0.1s;
    border-radius: 5px;
    &:hover{
        box-shadow: 0px 0px 2px 0px ${props => props.theme.colors.primary};
        opacity: 0.9;
    }
`

const Title = styled.h1`
    font-family: 'Staatliches';
    font-weight: 500;
    line-height: 1em;
    text-transform: uppercase;
    color: #d9d9d9;
    font-size: 2.4em;
    padding: 5px;
    @media (max-width: 700px) {
        font-size: 2em;
  }
`

const Subtitle = styled.h2`
    margin-top: 2%;
    font-family: 'Staatliches';
    font-style: "italic";
    font-weight: 500;
    line-height: 1em;
    color: #d7fff2;
    font-size: 1.5em;
    @media (max-width: 700px) {
        font-size: 1em;
  }
`

const ContentBox = styled.div`
    display: flex;
    flex-direction: row;
    border: 1px solid ${props => props.theme.colors.lineAlt};
    justify-content: space-between;
    padding-left: 2%;
    background: ${props => props.theme.colors.subContent};
    width: 100%;
`

const List = styled.div`
    margin-top: 7%;
    width: 30%;
    min-height: 250px;
    text-align: left;
    animation: fadeIn 0.5s;
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
`

const CodeBox = styled.div`
    width: 100%;
    min-width: 500px;
    margin-left: 5%;
    animation: fadeIn 0.5s;

`

const ListItem = styled.div`
    color: ${props => props.theme.colors.text_title};
    font-family: 'Helvetica';
    font-size: 1.1em;
    padding-left: 5%;
    padding-top: 5%;
    padding-bottom: 5%;
`

const Nav = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    background: ${props => props.theme.colors.landingBox};
    padding-left: 1%;
    padding-right: 1%;
`

const NavButton = styled.button`
    padding: 2%;
    background: inherit;
    border: 1px solid #ced1cf; 
    color: #ced1cf;
    font-family: 'Staatliches';
    letter-spacing: 1px;
    font-size: 1.3em;
    &:hover{
        color: white;
    }
`

const Flex = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: ${props => props.theme.colors.subContent};
    border-bottom: 1px solid ${props => props.theme.colors.medium};
    &:hover{
        box-shadow: 0px 0px 2px 0px linear-gradient(270deg, ${props => props.theme.colors.landingBox} 100%, #00574B 0%);
        color: green;
        opacity: 0.7;
        cursor: pointer;
    }
`

const MarkdownBox = styled.div`
    background: #ced1cf; 
    border: 1px solid ${props => props.theme.colors.lineAlt};
    color: white;
    min-height: 100px;
`



function LanguageSection() {
    const [voc, setVoc] = useState('Select term to preview code')
    const [subcat, setSubcat] = useState('All')
    const [langArticles, setLangArticles] = useState(null)
    const [article, setArticle] = useState(null)
    const [sub, setSub] = useState('Definition')
    // Define in metadata subcategories, based on subcategories  display columns
    // Action ikonky + Display

    const token = process.env.REACT_APP_CMS_API
        const getLangArticles = async() => {
            try{
                const response = await axios.get(`${process.env.REACT_APP_ENVIRONMENT}/api/languages?pagination[limit]=500&sort=Title`, {headers: {
                    Authorization: `Bearer ${token}`
                        }},)
                const data = response.data.data
                setLangArticles(data)
                } catch(error){
                    console.log(error)
                }
            }
        useEffect(() => {
            getLangArticles()
            // eslint-disable-next-line 
        },[])

        const MappedArticles = ({d}) => {
            return <>
                 <Flex  key={d.id} onClick={()=>{openTerm(d.attributes.Book,d.attributes.Solidity)}}>
                        <ListItem>{d.attributes.Title}</ListItem>   
                </Flex>
            </>
        }
        const openTerm = async(article, code ) => {
            await setArticle(null)
            await setVoc(null)
            await setArticle(article);
            await setVoc(code);
        }

    return (
            <Kontejner>
                        <TitleBox>
                            <Title>Language Cheatsheet</Title>
                            <Subtitle>Learn basic language concepts</Subtitle>
                        </TitleBox>
                        <Nav> 
                                <NavButton onClick={()=>{setSubcat('All')}}>All terms</NavButton>
                                <NavButton onClick={()=>{setSubcat('Basics')}}>Basics</NavButton>
                                <NavButton onClick={()=>{setSubcat('Types')}}>Value types</NavButton>
                                <NavButton onClick={()=>{setSubcat('Functions')}}>Functions</NavButton>
                                <NavButton onClick={()=>{setSubcat('Standard')}}>Standards</NavButton>
                                <NavButton onClick={()=>{setSubcat('Security')}}>Security</NavButton>
                         </Nav>
                        <ContentBox>
                            <List>
                {langArticles && subcat === 'All' && <> {langArticles.map((d) => ( <MappedArticles d={d}/> ))}</>}
               {langArticles && subcat && <> {langArticles.filter((s) => s.attributes.Type === subcat).map((d) => ( <MappedArticles d={d}/> ))}</>}
               {!langArticles && <>Error, no articles found</>}
                            </List>
                            <CodeBox>
                                <TitleSubBox>
                                        <SectionButton onClick={()=>{setSub('Definition')}}>Definition</SectionButton>
                                        <Divider vertical/>
                                        <SectionButton onClick={()=>{setSub('Example')}}>Example</SectionButton>
                                    </TitleSubBox>
                                 {sub === "Example" &&  <CodeComponent code={voc}/>}
                                 {sub === "Definition" && article && <MarkdownBox><Md source={article}/></MarkdownBox>}
                            </CodeBox>
                        </ContentBox>
            </Kontejner>
    );
}

export default LanguageSection;





