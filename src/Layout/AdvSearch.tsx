import { useState } from "react"

const AdvSearch = () => {

  const [advSearch,setAdvSearch] = useState<boolean>(false)
  
  const toggleSearch = () =>{
    advSearch ? setAdvSearch(false) : setAdvSearch(true);
  }

  return (
    <div className={advSearch ? 'advanced-search active':'advanced-search'}>

    <a onClick={toggleSearch} className="advanced-search-btn">Show Advanced Search <i className={advSearch ? 'fa fa-chevron-circle-up' : 'fa fa-chevron-circle-down'}></i>
    </a>

    </div>
  )
}

export default AdvSearch