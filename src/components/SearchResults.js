import React from "react";
import { useEffect, useState } from "react"
import './SearchResults.css'
const SearchResults = ({lineArray,matchIndex,length}) => {
    const [results,setResults] = useState([])
    useEffect(() => {
        setResults([])
        try{
            for(let i = 0;i < Object.keys(matchIndex).length;i++){
                const line = lineArray[i]
                for(let j of matchIndex[i+1]){
                    if(line)
                        setResults(results => [...results, <li className="list-group-item lines"  key = {[i,j]}><h5>line {i+1}: ...{line.substring(Math.max(0,j-10),j)}<b>{line.substring(j,j+length)}</b>{line.substring(j+length,j+(length<10?10:length+5))}...</h5></li>])
                }
            }
        }
        catch(error){
            console.log(error)
        }
        
    },[matchIndex])

    return(
        <div  className="scrl">
            <ul className = "list-group">
                {results}
            </ul>
            
        </div>
    )
}
export default SearchResults