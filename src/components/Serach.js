import React, {useState} from 'react';

const Serach = (props) =>{

    const [searchValue, setSearchValue] =useState("");
    
    const handleSearchInputChanges =(e) =>{
        setSearchValue(e.target.value);
    }

    const resetInputFild =()=>{
        setSearchValue("");
    }

    const callSearchFunction =(e) =>{
        e.preventDefault();
        props.search(searchValue);
        resetInputFild();
    }
    return(
        <form className="search">
            <input
            value ={searchValue}
            onChange={handleSearchInputChanges}
            type="text"
            ></input>
              <input onClick={callSearchFunction} type="submit" value="SEARCH" />
        </form>
    )
}

export default Serach;

