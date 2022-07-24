import styled from 'styled-components'

const SectionTitle = styled.div`
    color: ${props => props.theme.colors.text_primary};
    width: 100%;
    font-weight: 700;
    padding: 2%;
    font-size: 1.1em;
    background: ${props => props.theme.colors.subContentTitle};
    border: 1px solid ${props => props.theme.colors.lineAlt};
    font-family: 'Spectral', serif;
    border-radius: 5px;
    margin-bottom: 2%;
    animation: fadeIn 0.5s;
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
`

const GqlSection = ({title}) => {
    return <>
        <SectionTitle>{title}</SectionTitle>
    </>
}

export default GqlSection;