import {useState, useEffect} from 'react'
import styled from 'styled-components'
import {Divider} from 'rsuite'
import axios from 'axios'
import Md from '../components/code/Md'
import CodeSeparate from '../components/code/CodeSeparate'
import Err from '../components/typography/Err'

const Kontejner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 15%;
    margin-right: 15%;
    margin-top: 1%;
    background: #f9fff8;
    border-radius: 15px;
    padding-bottom: 2%;
    @media (max-width: 700px) {
       margin: 0;
       width: 100%;
  }
`

const TitleBox = styled.div`
    display: flex;
    border: 1px solid ${props => props.theme.colors.line};
    border-radius: 15px;
    width: 100%;
    padding: 1%;
    background:  ${props => props.theme.colors.landingBox};
    animation: fadeIn 0.5s;
    margin-bottom: 1%;
    flex-wrap: wrap;
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
    @media (max-width: 700px) {
       margin: 0;
       width: 100%;
       padding: 5px;
  }
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

const SectionActButton = styled(SectionButton)`
    box-shadow: 0px 0px 2px 0px ${props => props.theme.colors.primary};
    opacity: 0.9;
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
    @media (max-width: 1000px) {
       min-width: 100px;
  }
`

const ListItem = styled.div`
    color: ${props => props.theme.colors.text_title};
    font-family: 'Helvetica';
    font-size: 1.1em;
    padding-left: 5%;
    padding-top: 5%;
    padding-bottom: 5%;
    @media (max-width: 1000px) {
        font-size: 1em;
  }
`

const Nav = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    background: ${props => props.theme.colors.landingBox};
    padding-left: 1%;
    padding-right: 1%;
    flex-wrap: wrap;
    @media (max-width: 700px) {
        justify-content: flex-start;
  }
`

const NavButton = styled.button`
    padding: 1%;
    background: inherit;
    border: 1px solid #ced1cf; 
    color: ${props => props.theme.colors.landingTitle};
    font-family: 'Staatliches';
    letter-spacing: 1px;
    font-size: 1.3em;
    &:hover{
        color: white;
    }
    @media (max-width: 700px) {
        font-size: 1.1em;
        padding:0;
        padding-left: 5px;
        padding-right: 5px;
  }
`

const NavActButton = styled(NavButton)`
    background: ${props => props.theme.colors.nav};
    &:hover{
        color: ${props => props.theme.colors.landingTitle};
    }
`

const Flex = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: ${props => props.theme.colors.subContent};
    border-bottom: 1px solid ${props => props.theme.colors.medium};
    box-shadow: 0px 0px 2px 0px ${props => props.theme.colors.lineAlt};
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

const RefBox = styled.div`
    font-size: 0.9em;
    background: ${props => props.theme.colors.step};
    color: ${props => props.theme.colors.text_primary};
`



function LanguageSection() {
    const [voc, setVoc] = useState('Select term to preview code')
    const [subcat, setSubcat] = useState('All')
    const [langArticles, setLangArticles] = useState(null)
    const [article, setArticle] = useState(null)
    const [reference, setReference] = useState(null)
    const [sub, setSub] = useState('Definition')
    const [err, setError] = useState(false)
    // Define in metadata subcategories, based on subcategories  display columns
    // Action ikonky + Display

    const token = process.env.REACT_APP_CMS_API
        const getLangArticles = async() => {
            try{
                setError(false)
                const response = await axios.get(`${process.env.REACT_APP_ENVIRONMENT}/api/languages?pagination[limit]=500&sort=Title`, {headers: {
                    Authorization: `Bearer ${token}`
                        }},)
                const data = response.data.data
                setLangArticles(data)
                } catch(error){
                    console.log(error)
                    setError(true)
                }
            }
        useEffect(() => {
            getLangArticles()
            // eslint-disable-next-line 
        },[])

        const MappedArticles = ({d}) => {
            return <>
                 <Flex  key={d.id} onClick={()=>{openTerm(d.attributes.Book,d.attributes.Solidity, d.attributes.referenceSol)}}>
                        <ListItem>{d.attributes.Title}</ListItem>   
                </Flex>
            </>
        }
        const openTerm = async(article, code, reference ) => {
            await setArticle(null)
            await setVoc(null)
            await setArticle(article);
            await setVoc(code);
            setReference(reference)
        }

        const NavItem = ({state, label}) => {
            return<>
               {subcat === state ? <NavActButton>{label}</NavActButton> :  <NavButton onClick={()=>{setSubcat(state)}}>{label}</NavButton>}
            </>
        }

    return (
            <Kontejner>
                        <Nav> 
                            <NavItem state='All' label='All terms'/>
                            <NavItem state='Basics' label='Basics'/>
                            <NavItem state='Types' label='Value types'/>
                            <NavItem state='Functions' label='Functions'/>
                            <NavItem state='Standard' label='Standard'/>
                            <NavItem state='Security' label='Security'/>
                         </Nav>
                        <ContentBox>
                            <List>
                {langArticles && subcat === 'All' && <> {langArticles.map((d) => ( <MappedArticles d={d}/> ))}</>}
               {langArticles && subcat && <> {langArticles.filter((s) => s.attributes.Type === subcat).map((d) => ( <MappedArticles d={d}/> ))}</>}
               {err && <Err content='Error, no articles retrieved'/>}
                            </List>
                            <CodeBox>
                                <TitleSubBox>
                                      {sub === 'Definition' ? <SectionActButton>Definition</SectionActButton> : <SectionButton onClick={()=>{setSub('Definition')}}>Definition</SectionButton>}  
                                        <Divider vertical/>
                                        {sub === 'Example' ? <SectionActButton>Example</SectionActButton> : <SectionButton onClick={()=>{setSub('Example')}}>Example</SectionButton>}  
                                    </TitleSubBox>
                                 {sub === "Example" && <CodeSeparate code={voc} />}
                                 {sub === "Definition" && article && <MarkdownBox><a href={reference} target="_blank" rel="noopener noreferrer"><RefBox>{reference}</RefBox></a><Md source={article}/></MarkdownBox>}
                            </CodeBox>
                        </ContentBox>
            </Kontejner>
    );
}

export default LanguageSection;





