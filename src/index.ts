
// merge: regex  grep checkout changes for both // git log --merges -l
// checkout: parsing grep checkout changes for both
// find out how to filter grep more 
// write unit test for all functions 

import * as yargs from 'yargs';
import * as shell from 'shelljs';
import colors from './colors';
import * as util from './util';
import * as cmnd from './shellCommands';

let args = String(yargs.argv.git_params);

let type = util.inferGitCommand(args);

 const parsedArgs = args.split(" ");

if(type == 'checkout' && parsedArgs[0] !== parsedArgs[1]){

  if(parsedArgs[2] === '1') {
    cmnd.displayGitLog();
  }
  
  const gitDiversionHash = cmnd.gitLogDiversionHash(parsedArgs[0], parsedArgs[1]).substring(0, 8);

  util.displayBreakingChanges(gitDiversionHash, parsedArgs[1]);

}

if (type === 'merge') {

  cmnd.displayGitLog();
  
   const mergeMessage =  cmnd.gitLogAllMerges();
  
   const parsedValue = util.parseValueWithRegex(`^Merge:\\s(\\w{7,})\\s(\\w{7,})$`, mergeMessage);
   console.log('the pased ', parsedValue);
  if (parsedValue && parsedValue.length != 0) {
    
    const mergeBaseHash =  cmnd.gitLogDiversionHash(parsedValue[1], parsedValue[2]).substring(0, 8);

     util.displayBreakingChanges(mergeBaseHash, parsedValue[2]);
    
  }

}