import React, {useEffect} from 'react'
import { useRemark } from 'react-remark';
import styled from 'styled-components';
import remarkGemoji from 'remark-gemoji';
import rehypeSlug from 'rehype-slug';
import rehypeAutoLinkHeadings from 'rehype-autolink-headings';


const Kontejner = styled.div`
    color: ${props => props.theme.colors.text_primary};
    text-align: left;
    padding: 5%;
    background: ${props => props.theme.colors.lightGreen};
    @media (max-width: 1000px) {
    font-size: 0.7em;
  }
`

const P = styled.p`
    color: ${props => props.theme.colors.text_primary};
    font-size: 0.8em;
    font-family: 'Helvetica';
    @media (max-width: 1000px) {
    font-size: 0.7em;
  }
`

const Link = styled.a`
    text-decoration: none;
    outline: none;
`

const H1 = styled.div`
  color: ${props => props.theme.colors.text_title};
  font-family: 'Staatliches';
  font-size: 1.6em;
  @media (max-width: 1000px) {
    font-size: 1.2em;
  }
`

const H2 = styled.div`
  color: ${props => props.theme.colors.text_title};
  font-family: 'Staatliches';
  padding-bottom: 1%;
  padding-top: 1%;
  font-size: 1.5em;
  letter-spacing: 1px;
  @media (max-width: 1000px) {
    font-size: 1em;
  }
`

const H3 = styled.div`
  color: ${props => props.theme.colors.text_primary};
  font-family: 'Staatliches';
  font-size: 1.3em;
  letter-spacing: 1px;
  @media (max-width: 1000px) {
    font-size: 0.8em;
  }
`
const Code = styled.code`
  background: ${props => props.theme.colors.light};
  border-radius: 5px;
  padding-left: 4px;
  padding-right: 4px;
  @media (max-width: 1000px) {
    font-size: 0.7em;
  }
`

const Pre = styled.pre`

`

const Md = ({source}) => {
    const [reactContent, setMarkdownSource] = useRemark({
        remarkPlugins: [remarkGemoji],
        remarkToRehypeOptions: { allowDangerousHtml: false },
        rehypePlugins: [rehypeSlug, rehypeAutoLinkHeadings],
        rehypeReactOptions: {
          components: {
            p: (props) => <P {...props} />,
            a: (props) => (
              <Link {...props} target="_blank" rel="noopener noreferer">
              {props.children}
              </Link>
        ),
         code: (props) => <Code {...props} />,
         pre: (props) => <Pre {...props} />,
            h1: (props) => <H1 {...props} />,
            h2: (props) => <H2 {...props} />,
            h3: (props) => <H3 {...props} />
          },

        },
      });

    useEffect(() => {
      setMarkdownSource(source);
      // eslint-disable-next-line
    }, [source]);
  
    return <Kontejner>{reactContent}</Kontejner>
}

export default Md;