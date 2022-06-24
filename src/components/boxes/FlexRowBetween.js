import SlicedDescription from './SlicedDescription';

const Div= styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const FlexRowBetween = ({content}) => {
    return (
        <Div>{content}</Div>
    )
}

export default FlexRowBetween