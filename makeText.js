/** Command-line tool to generate Markov text. */

const fs = require('fs');
const process = require('process');
const axios = require('axios');

const {MarkovMachine} = require('./markov');

function printText(data){
    const mm = new MarkovMachine(data)
    console.log(mm.makeText())
}

function cat(path){
    fs.readFile(path, 'utf8', (err, data)=>{
        if (err){
            console.log(`Error reading ${path}: ${err}`);
            process.exit(1);
        }
        printText(data)
    })
}

async function webCat(url){
    try{
        const {data} = await axios.get(url)
        printText(data)
    } catch (err){
        console.log(`Error fetching ${url}: ${err}`)
        process.exit(1)
    }
}

const state = process.argv[2]
if(state === 'file') cat(process.argv[3]);
else if (state === 'url') webCat(process.argv[3]); 
else {
    console.log('Error: follow format => node jsfile.js file/url path/url');
    process.exit(1)
}