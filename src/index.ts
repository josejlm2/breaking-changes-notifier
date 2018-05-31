
// merge: regex  grep checkout changes for both // git log --merges -l
// checkout: parsing grep checkout changes for both
// if there are no breaking changes extract the value out 

import * as yargs from 'yargs';
import * as shell from 'shelljs';
import colors from './colors';
import { inferGitCommand , parseValueWithRegex , GitDiversionValue, displayMergeMessage, displayGitLog, displayBreakingChanges} from './util';

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
  
   displayBreakingChanges(parsedArgs[0], parsedArgs[1]);

}



if (type === 'merge') {

  displayGitLog();
  
   const mergeMessage =  displayMergeMessage();
  
   const parsedValue = parseValueWithRegex(`^Merge:\\s(\\w{7,})\\s(\\w{7,})$`, mergeMessage);

  if (parsedValue && parsedValue.length != 0) {
    
   const mergeBaseHash =  GitDiversionValue(parsedValue[1], parsedValue[2]);

   console.log(typeof mergeBaseHash);
   console.log(" parsed args 2" , parsedValue[2]);

     displayBreakingChanges(mergeBaseHash, parsedValue[2]);
    
  }

}

