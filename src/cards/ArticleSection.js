import { Grid, Row } from 'rsuite'
import ArticleCard from './ArticleCard';
import  {useTheme} from 'styled-components'
import { NftIcon, NodeIcon } from '../icons/tool';
import { Unicorn } from '../icons/funny';
import { Logo } from '../icons/main';
import { GithubIcon, DataflowIcon } from '../icons/utils';


function ArticleSection() {
    const theme = useTheme()

    return (
            <>
                <Grid fluid>
                <Row>  
                         <ArticleCard date='17.6.2022' title='D3V Library at Nights & Weekends' description='Accepted application to Buildspace’s 6-week challenge' pic={<Unicorn width='35%' colorStroke={theme.tool.unicornStroke} colorFill={theme.tool.unicornFill}/>}  reference='https://medium.com/@michalkadan/d3v-library-at-nights-weekends-f4e14f4d5905'/>
                         <ArticleCard  date='13.6.2022' title='D3V Library: Repositories' description='New content: List of Github repositories with reference projects' pic={<GithubIcon width='40%' color={theme.tool.github}/>}  reference='https://medium.com/@michalkadan/d3v-library-repositories-f567e18a44be'/>
                         <ArticleCard  date='6.6.2022' title='D3V Library: Tools' description='2nd project milestone and new features' pic={<DataflowIcon width='50%' color={theme.tool.dataflow}/>}  reference='/'/>
                    </Row>
                    <Row>  
                    <ArticleCard date='21.6.2022' title='Comparison: NFT API providers' description='Struggle to find NFT data API for your project? This article will help you decide.' pic={<NftIcon width='40%' color={theme.tool.nft}/>} reference='https://medium.com/web3-magazine/comparison-nft-api-providers-5f45368d2c7f'/>
                    <ArticleCard  date='15.6.2022' title='Comparison: Node providers' description='Need blockchain data without local node? There is some solution.' pic={<NodeIcon width='35%' colorStroke={theme.tool.nodeStroke} colorFill={theme.tool.nodeFill}/>}   reference={'https://medium.com/web3-magazine/comparison-node-providers-d0a9787f7777'}/>    
                    <ArticleCard  date='20.5.2022' title='Welcome D3V Library' pic={<Logo width='40%' colorStroke={theme.tool.logo} colorFill={theme.tool.logo}/>}  reference='https://medium.com/@michalkadan/d3v-library-ccd977daf5dc'/>
                    </Row>
            </Grid>
            </>
    );
}

export default ArticleSection;





