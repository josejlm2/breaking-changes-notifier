
// merge: regex  grep checkout changes for both // git log --merges -l
// checkout: parsing grep checkout changes for both
// if there are no breaking changes extract the value out 

import * as yargs from 'yargs';
import * as shell from 'shelljs';
import colors from './colors';
import { inferGitCommand , parseValueWithRegex , displayBreakingChanges} from './util';
import {gitLogGrepChanges , gitLogDiversionHash , gitLogAllMerges ,  displayGitLog } from './shellCommands';

let args = String(yargs.argv.git_params);


let type = inferGitCommand(args);
console.log(type);

 const parsedArgs = args.split(" ");

 console.log(parsedArgs);

//print args
console.log('hash1='+ parsedArgs[0]);
console.log('hash2='+ parsedArgs[1]);
console.log("show log="+ parsedArgs[2]);


 // console.log("the type is checkout");
if(type == 'checkout' && parsedArgs[0] !== parsedArgs[1]){

  if(parsedArgs[2] === '1') {
    displayGitLog();
  }
  
  const gitDiversionHash = gitLogDiversionHash(parsedArgs[0], parsedArgs[1]).substring(0, 8);

  displayBreakingChanges(gitDiversionHash, parsedArgs[1]);

}



if (type === 'merge') {

  displayGitLog();
  
   const mergeMessage =  gitLogAllMerges();
  
   const parsedValue = parseValueWithRegex(`^Merge:\\s(\\w{7,})\\s(\\w{7,})$`, mergeMessage);

  if (parsedValue && parsedValue.length != 0) {
    
   const mergeBaseHash =  gitLogDiversionHash(parsedValue[1], parsedValue[2]).substring(0, 8);

   console.log("the mergebase hash ", mergeBaseHash);
   console.log(" parsed args 2" , parsedValue[2]);

     displayBreakingChanges(mergeBaseHash, parsedValue[2]);
    
  }

}

