export const fetchDefiPath = `query FetchDefiPath ($chainV: String, $chainL:String,$cat:String,$subcat: String,$feature:[String]) {
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
          ViewCounter
        }
      }
    }
    definitions (pagination: {limit: 150 },filters: 
        {Usage:{eq:$cat},
        or:{Subcategory:{in:["Stablecoin","Analysis","General"]},
        or:{Chain:{in:["Any",$chainL]}
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
        {Chain:{eq:$chainL}, 
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
    repos (pagination: {limit: 150 },filters: 
        {language:{eq:"Solidity"}, 
    or:{category:{eq:$cat},
    or:{subcategory:{eq:$subcat},
  }}}){ 
      data  {
        attributes {
          title 
          description 
          reference
        }
      }
    }
  }
  `

export const fetchDaoPath = `query FetchDaoPath ($chainV: String, $chainL:String,$cat:String,$subcat: String,$feature:[String],$lang:String) {
    tutorials (pagination: {limit: 150 },filters: 
        {Chain:{eq:$chainV}, 
  or:{Category:{eq:$cat},
  or:{Language:{eq:$lang},
  or:[{Subcategory:{in:[$subcat, "VRF","Data", "Metadata","Storage"]}},{Subcategory:{in:$feature}, }]}
}}){ 
      data  {
        attributes {
          Title 
          Description 
          Difficulty
          Reference
        }
      }
    }
    definitions (pagination: {limit: 150 },filters: 
        {Usage:{eq:$cat}, 
        or:{Subcategory:{in:["General"]}
        or:{Chain:{in:["Any",$chainL]}
        }}} ){ 
      data  {
        attributes {
          Title 
          Description
          Reference 
        }
      }
    }
    tools (pagination: {limit: 150 },filters: 
        {Chain:{eq:$chainL}, 
    or:{Usage:{eq:$cat},
  }}){ 
      data  {
        attributes {
          Title 
          Description 
          Chain
          Usage
          Subcategory
          Reference
        }
      }
    }
    repos (pagination: {limit: 150 },filters: 
        {language:{eq:'Solidity'}, 
    or:{category:{eq:$cat},
    or:{subcategory:{eq:$subcat},
  }}}){ 
      data  {
        attributes {
          title 
          description 
          reference
        }
      }
    }
  }
  `

  export const fetchNftPath = ` query FetchNftPath ($chainV: String, $chainL:String,$cat:String,$subcat: String,$feature:[String],$lang:String) {
    tutorials (pagination: {limit: 150 },filters: 
        {Chain:{eq:$chainV}, 
  or:{Category:{eq:$cat},
  or:{Language:{eq:$lang},
  or:[{Subcategory:{in:[$subcat, "VRF","Data", "Metadata","Storage"]}},{Subcategory:{in:$feature}, }]}
}}){ 
      data  {
        attributes {
          Title 
          Description 
          Difficulty
          Reference
          ViewCounter
        }
      }
    }
    definitions (pagination: {limit: 150 },filters: 
        {Usage:{eq:$cat}, 
        or:{Chain:{in:["Any",$chainL]}
        } } ){ 
      data  {
        attributes {
          Title 
          Description
          Reference 
          Subcategory
          Reference
          ViewCounter
        }
      }
    }
    tools (pagination: {limit: 150 },filters: 
        {Chain:{eq:$chainL}, 
    or:{Usage:{eq:$cat},
  }}){ 
      data  {
        attributes {
          Title 
          Description 
          Chain
          Usage
          Subcategory
          Reference
        }
      }
    }
    repos (pagination: {limit: 150 },filters: 
        {language:{eq:$lang}, 
    or:{category:{eq:$cat},
    or:{subcategory:{eq:$subcat},
  }}}){ 
      data  {
        attributes {
          title 
          description 
          reference
        }
      }
    }
  }
  `

export const fetchSecPath = `query FetchSecPath ( $chainL:String,$subcat: String,$feature:[String]) {
    tutorials (pagination: {limit: 150 },filters: 
        {Chain:{eq:"evm"}, 
        or:{Category:{in:["Exploit","Vulnerability"]},
        or:[{Subcategory:{in:[$subcat, "Audit","General"]}},{Subcategory:{in:$feature}, }]
}}){ 
      data  {
        attributes {
          Title 
          Description 
          Difficulty
          Reference
          Category
          ViewCounter
          Subcategory
        }
      }
    }
    definitions (pagination: {limit: 150 },filters: 
        {Usage:{eq:"Security"}, 
        or:{Chain:{in:["Any",$chainL]}
        } } ){ 
      data  {
        attributes {
          Title 
          Description 
          Usage
          Subcategory
          Reference
          ViewCounter
        }
      }
    }
    tools (pagination: {limit: 150 },filters: 
        {Chain:{eq:$chainL}, 
    or:{Usage:{eq:"Security"},
  }}){ 
      data  {
        attributes {
          Title 
          Description 
          Chain
          Reference
          Usage
          Subcategory
        }
      }
    }
  }
  `

  export const fetchSetup = `query FetchSetup ($chainV: String, $chainL:String) {
    tutorials (pagination: {limit: 150 },filters: 
        {Chain:{eq:$chainV}, 
  or:{Category:{eq:"Starter"}
}}) { 
      data  {
        attributes {
          Title 
          Description 
          Reference
          Tool
          ViewCounter
        }
      }
    }
    tools (pagination: {limit: 150 },filters: 
        {Chain:{eq:$chainL}, 
    or:{Subcategory:{in:["Template","Examples","Library","Frontend"]},
  }}){ 
      data  {
        attributes {
          Title 
          Description 
          Chain
          Usage
          Subcategory
        }
      }
    }
  }
  `

  export const fetchGovern = `query FetchGovern  {
    tutorials (pagination: {limit: 150 },filters: 
        {Chain:{eq:"evm"}, 
  or:{Category:{eq:"Token"},
  or:{Subcategory:{in:["Staking","Vesting"]}}
}}){ 
      data  {
        attributes {
          Title 
          Description 
          Difficulty
          Reference
          ViewCounter
        }
      }
    }
    definitions (pagination: {limit: 150 },filters: 
        {Usage:{eq:"Token"},
        or:{Chain:{in:["Any","evm"]}
        }} ){ 
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
        {Chain:{eq:"EVM"}, 
    or:{Usage:{eq:"DAO"},
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
    repos (pagination: {limit: 150 },filters: 
        {language:{in:["Solidity","JavaScript"]}, 
    or:{category:{eq:"Token"},
  }}){ 
      data  {
        attributes {
          title 
          description 
          usage
          subcategory
          reference
        }
      }
    }
  }
  `