import TutorialTable from "../components/tables/TutorialTable";
import FilterChain from '../components/filters/chainFilter';
import AlgoliaTable from "../components/tables/AlgoliaTable";

export default function Tutorials() {
    return <>  <FilterChain/>  
    <TutorialTable/> 
    <AlgoliaTable/>
    </>;
  }