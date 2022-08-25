import React from "react";
import { useEffect, useState } from "react";
import SearchResults from "./SearchResults";

const ZFunction = ({text,pattern}) =>{
    const [matchIndex,setMatchIndex] = useState([])
    const [lineArray,setLineArray] = useState([])
    useEffect(() => {
        const collection = {}
        if(text.length){
            setLineArray(text.split('\n'))
            for(let i  = 1;i <= lineArray.length;i++){
                collection[i] = []
                search(lineArray[i-1],pattern,collection[i])
            }
        }
        setMatchIndex(collection)
    },[pattern])
    const  search = (line,word,arr) =>{
        if(!word.length){
            return
        }
        let concat = word + "$" + line;

        let l = concat.length;

        let Z = new Array(l);

        getZarr(concat, Z);
        for(let i = 0; i < l; ++i){
            if(Z[i] == word.length){
                arr.push(i-word.length-1)
            }
        }
    }

    const getZarr = (str,Z) =>{
        let n = str.length;
        let L = 0, R = 0;
        for(let i = 1; i < n; ++i) {
            if(i > R){
                L = R = i;
                while(R < n && str[R - L].toUpperCase() === str[R].toUpperCase())
                    R++;		
                Z[i] = R - L;
                R--;
            }
            else{
                let k = i - L;

                if(Z[k] < R - i + 1)
                    Z[i] = Z[k];
                else{
                    L = i;
                    while(R < n && str[R - L] == str[R])
                        R++;
                    Z[i] = R - L;
                    R--;
                }
            }
        }
    }
    return(
        <div>
            <SearchResults lineArray={lineArray} matchIndex = {matchIndex} length = {pattern.length}/>
        </div>
    )

}
export default ZFunction; 
