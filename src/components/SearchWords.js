import {  useState } from "react";
import ZFunction from "./ZFunction";
import React from "react";

const SerachWords = ({displayText}) => {
    const [searchPattern,setSearchPattern] = useState("")
    const onInputChange = (event) => {
        setSearchPattern(event.target.value)
        
    }
    return(
        <div>
            <div >
                <input id="find" suggestion = "false" className="form-control" type="text" placeholder="Find" aria-label="Find" onChange = {onInputChange}/>
            </div>
            
            <hr />
            <ZFunction text={displayText} pattern = {searchPattern}/>
        </div>
    )
}
export default SerachWords;