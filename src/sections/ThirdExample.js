
import styled from 'styled-components'

import SectionSubtitle from '../components/typography/SectionSubtitle'
import PreviewButton from '../components/buttons/PreviewButton'


const Kontejner = styled.div`
    padding: 2%;
`

const Section = styled.div`
    border: 1px solid black;
    padding: 2%;
    color: ${props => props.theme.colors.text_secondary};
`

const Flex = styled.div`
    display: flex;
    justify-content: space-between;
`


const ThirdExample = () => {


    return <Kontejner>
                <Section>
                   <Flex> <SectionSubtitle content='Connect wallet'/> 
                    <PreviewButton/>
                    </Flex>
                </Section>
                <Section>
                    <Flex> <SectionSubtitle content='Alchemy core'/> 
                    <PreviewButton/>
                    </Flex>
                </Section>
    </Kontejner>
}

export default ThirdExample;