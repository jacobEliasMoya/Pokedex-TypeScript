import { useState } from "react"
import Button from "../Components/Button"

const AdvSearch = () => {

  const [advSearch,setAdvSearch] = useState<boolean>(false)
  
  const toggleSearch = () =>{
    advSearch ? setAdvSearch(false) : setAdvSearch(true);
  }

  const [searchText, setSearchText] = useState<string>();

  const handleSearchChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setSearchText(e.target.value)
  }

  return (
    <div className={advSearch ? 'advanced-search active ':'advanced-search'}>

      <div className="row w-75 pt-4 ">
        <div className="col-md-6">
          <Button 
            buttonText={`Search for ${searchText}`} 
            buttonClass={'w-100 text-capitalize'} 
            buttonIcon={undefined} 
            morePokemon={undefined}    
          />
        </div>
        <div className="col-md-6">
          <input onChange={handleSearchChange} className="w-100 h-100 rounded b-none" type="text" />
    
        </div>
      </div>


      <a onClick={toggleSearch} className="advanced-search-btn">Show Advanced Search <i className={advSearch ? 'fa fa-chevron-circle-up' : 'fa fa-chevron-circle-down'}></i>
      </a>

    </div>
  )
}

export default AdvSearch