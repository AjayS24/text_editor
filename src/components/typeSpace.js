import React, { useState } from "react";
import RecommendationDropDown from "./RecommendationDropDown";
import SerachWords from "./SearchWords";
import './typeSpace.css'


const TypeSpace = () =>{
  const [text,setText] = useState("");
  const [displayText,setDisplayText] = useState("");
  const [wrappedParts,setWrappedParts] = useState([]);
  const [previousText,setPriviousText] = useState([]);



  const onTextChange = (event) => {
    setDisplayText(event.target.value)
    const string = event.target.value;
    let stringParts = [];
    for(let i = 0;i < string.length;i++){
      if(string[i] !== '\n' && string[i] !== ' '){
        let j = i;
        while(j < string.length && string[j] !== '\n' && string[j] !== ' ')j++;
        if(j >= string.length){
          stringParts.push(string.substring(i));
          stringParts.push(' ');
        }
        else{
          stringParts.push(string.substring(i,j));
          stringParts.push(string[j]);
        }
        i = j;
      }
      else{
        stringParts.push(string[i]);
      }
    }
    let flag = 1;
    for(let i = 0;i < stringParts.length;i++){
      if(wrappedParts[i] !== stringParts[i]){
        setText(stringParts[i]);
        flag = 0;
        break;
      }
    }
    if(flag){
      setText("")
    }
    setPriviousText(wrappedParts);
    setWrappedParts(stringParts);
  }


  const toSetDisplayText = (event) =>{
    for(let i = 0;i < wrappedParts.length;i++){
      if(wrappedParts[i] !== previousText[i]){
        wrappedParts[i] = event.target.value;
        break;
      }
    }
    let string = "";
    for(let i = 0;i < wrappedParts.length;i++){
      string += wrappedParts[i];
    }

    setDisplayText(string);
    setText("")
  }

  return(
      <div className="container ">
        <div id = "fb">
          <h2  id = "heading">TEXT EDITOR</h2>
        </div>
        <div className="row  ">
          <div  className = "p-2 col-12">
            <textarea  className="form-control textarea" rows = "16" column = "5" id="comment" spellCheck = "false" placeholder="type here" onChange={onTextChange} value = {displayText}/>
          </div>
          <div className = "p-2 col-4">
            <RecommendationDropDown  text = {text} toSetDisplayText = {toSetDisplayText}/>
          </div> 
          <div  className = "p-2 col-8">
            <SerachWords displayText={displayText}/>
          </div> 
            
        </div>
      </div>
  );
}
export default TypeSpace;