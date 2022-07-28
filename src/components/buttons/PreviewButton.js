import styled, {useTheme} from 'styled-components'
import { EyeIcon } from '../../icons/utils'

const Button = styled.button`
    background: inherit;
`

const PreviewButton = ({label, setF}) => {
    const theme = useTheme()
    return <><Button onClick={()=>{setF(true)}}><EyeIcon width='25' color={theme.colors.text_primary}/></Button> </>
}

export default PreviewButton