
class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    let removeDups = Array.from(new Set(this.words))
    const chain = removeDups.reduce((acc, curr) => (acc[curr] = [], acc), {})
    this.words.forEach((word, idx, arr) => {
      chain[word].push(arr[idx+1] ? arr[idx+1] : null)
    })

    this.chain = chain
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    let res = ''; 
    let randIdx = Math.floor(Math.random()* this.words.length)
    let currWord = this.words[randIdx]
    res += currWord;
    
    for(let i = 0; i < numWords; i++){
      let idx = Math.floor(Math.random()*this.chain[currWord].length)
      let nextWord = this.chain[currWord][idx];

      if (nextWord === null) break; 

      res += ' ' + nextWord;
      currWord = nextWord; 
    }

    return res

  }
}


module.exports = {MarkovMachine}