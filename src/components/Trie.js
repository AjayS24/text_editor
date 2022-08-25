class Node {
  constructor(value) {
    this.value = value
    this.suggestions = []
    this.children = {} 
  }
}

class Trie{
  constructor(){
    this.root = new Node(null)
  }

  insert(word, idx){

      let current = this.root

      for (let character of word) {

          if (current.suggestions.length < 5) {
              current.suggestions.push(idx)
          }

          if(current.children[character] === undefined){
              current.children[character] = new Node(character)
          }

          current = current.children[character]
      }

  }

  find(word){
      if(word === '\n' || word === ' ' || (!word.length)){
        return []
      }
      word = word.toLowerCase()
     let current = this.root

    for(let character of word){
         if(current.children[character] === undefined){
             return current.suggestions
         }
        current = current.children[character]  
    }
    return current.suggestions
  }
}

export default Trie;

