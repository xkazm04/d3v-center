export const fetchUni = `query FetchDefiPath ($cat:String,$subcat: String,$feature:[String]) {
    tutorials (pagination: {limit: 150 },filters: 
        {Chain:{eq:$chainV}, 
  or:{Category:{eq:$cat},
  or:[{Subcategory:{in:[$subcat]}},{Subcategory:{in:$feature}, }]}
}){ 
      data  {
        attributes {
          Title 
          Description 
          Difficulty
          Reference
          Subcategory
          ViewCounter
          codePreview
        }
      }
    }
    definitions (pagination: {limit: 150 },filters: 
        {Usage:{eq:$cat},
        or:{Subcategory:{in:["Stablecoin","Analysis","General",$subcat]},
        or:{Chain:{in:["Any",$chain]}
        }}} ){ 
      data  {
        attributes {
          Title 
          Description
          Subcategory 
          Reference
          ViewCounter
        }
      }
    }
    tools (pagination: {limit: 150 },filters: 
        {Chain:{eq:$chain}, 
    or:{Usage:{eq:$cat},
  }}){ 
      data  {
        attributes {
          Title 
          Description 
          Chain
          Usage
          Reference
          Subcategory
        }
      }
    }
  }
  `