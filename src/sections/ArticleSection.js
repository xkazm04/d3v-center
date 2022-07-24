import { Grid, Row } from 'rsuite'
import ArticleCard from '../cards/ArticleCard';
import  {useTheme} from 'styled-components'
import { NftIcon, NodeIcon } from '../icons/tool';
import { Unicorn } from '../icons/funny';
import { Logo } from '../icons/main';
import { GithubIcon, DataflowIcon } from '../icons/utils';
import { DillemaIcon, PacmanIcon, ThinkIcon } from '../icons/landing';


function ArticleSection() {
    const theme = useTheme()

    return (
            <>
                <Grid fluid>
                    <Row>
                    <ArticleCard date='22.7.2022' title='So, which blockchain to choose?' description='Another view on which blockchain to choose as a home for your dapp.' pic={<DillemaIcon width='150px' color={theme.tool.nft}/>} reference='https://medium.com/web3-magazine/nft-gaming-dev-tools-a4b7651f6a48'/>
                    </Row>
                    <Row>  
                    <ArticleCard date='1.7.2022' title='NFT Gaming Dev Tools' description='Comparing available tooling for play-and-earn projects.' pic={<PacmanIcon width='100px' color={theme.tool.nft}/>} reference='https://medium.com/web3-magazine/so-which-blockchain-to-pick-a4a571ee69fe'/>
                    <ArticleCard date='21.6.2022' title='Comparison: NFT API providers' description='Struggle to find NFT data API for your project? This article will help you decide.' pic={<NftIcon width='100px' color={theme.tool.nft}/>} reference='https://medium.com/web3-magazine/comparison-nft-api-providers-5f45368d2c7f'/>
                    <ArticleCard  date='15.6.2022' title='Comparison: Node providers' description='Need blockchain data without local node? There is some solution.' pic={<NodeIcon width='100px' colorStroke={theme.tool.nodeStroke} colorFill={theme.tool.nodeFill}/>}   reference={'https://medium.com/web3-magazine/comparison-node-providers-d0a9787f7777'}/>    
                    <ArticleCard  date='20.5.2022' title='Welcome D3V Library' pic={<Logo width='100px' colorStroke={theme.tool.logo} colorFill={theme.tool.logo}/>}  reference='https://medium.com/@michalkadan/d3v-library-ccd977daf5dc'/>
                    </Row>
                    <Row>  
                        <ArticleCard date='10.7.2022' title='Become web3 dev with D3V Library' description='Explore new paths in dApp learning' pic={<ThinkIcon width='70px' color={theme.tool.nft}/>} reference='https://medium.com/@michalkadan/d3v-library-at-nights-weekends-f4e14f4d5905'/>
                         <ArticleCard date='17.6.2022' title='D3V Library at Nights & Weekends' description='Accepted application to Buildspace’s 6-week challenge' pic={<Unicorn width='70px' colorStroke={theme.tool.unicornStroke} colorFill={theme.tool.unicornFill}/>}  reference='https://medium.com/@michalkadan/d3v-library-at-nights-weekends-f4e14f4d5905'/>
                         <ArticleCard  date='13.6.2022' title='D3V Library: Repositories' description='New content: List of Github repositories with reference projects' pic={<GithubIcon width='100px' color={theme.tool.github}/>}  reference='https://medium.com/@michalkadan/d3v-library-repositories-f567e18a44be'/>
                         <ArticleCard  date='6.6.2022' title='D3V Library: Tools' description='2nd project milestone and new features' pic={<DataflowIcon width='100px' color={theme.tool.dataflow}/>}  reference='https://medium.com/@michalkadan/d3v-library-bits-7bf3f8906401'/>
                    </Row>
            </Grid>
            </>
    );
}

export default ArticleSection;





