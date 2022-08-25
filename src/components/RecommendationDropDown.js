import React, { useEffect, useState } from "react";
import Trie from "./Trie";
import raw from './wordsList.txt';
import './RecommendationDropDown.css'
const RecommendationDropDown = ({text,toSetDisplayText}) => {
    const [recommendations,setRecommendations] = useState([])
    const [trie,setTrie] = useState(new Trie())
    const [words,setWords] = useState([])
    useEffect( () =>{
        setRecommendations(trie.find(text))
    },[text,trie])

    useEffect( () => {const getWords = async() => {
        try {
            let res = []
            let tempTrie = new Trie()

            fetch(raw)
            .then(r => r.text())
            .then(text => {
                res = text.split(/\r?\n/);
                for (let i = 0; i < res.length; i++) {
                    tempTrie.insert(res[i], i)
                }
                setWords(res)
            });            
        

            setTrie(tempTrie)
            console.log("DONE CREATING TRIE")
        } catch (error) {
            console.log("ERROR IN GETTING WORDS -> ", error)
        }
    } ; getWords() }     , [] )
    

    const recommendationList = recommendations.map((recommendation,i) => {

        return(
            <button className = "btn btn-outline-primary list-group-item-info" key = {i} value = {words[recommendation]} onClick={toSetDisplayText}>{words[recommendation]}</button>
        )
    })
    return(<div>
        <h5  id = "font"><b>TYPE AHEAD</b></h5>
        <output >{text}<br /></output>
        <div>
            <div className="btn-group-vertical ">
                {text.length > 1 || text[0] !== ' '?recommendationList:[]}
            </div>
        </div>
        </div>
    )
}
export default RecommendationDropDown;