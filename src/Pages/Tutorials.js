import TutorialTable from "../components/tables/TutorialTable";
import FilterChain from '../components/filters/chainFilter';

export default function Tutorials() {
    return <>  <FilterChain/>  
    <TutorialTable/> 
    </>;
  }