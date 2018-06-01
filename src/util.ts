import * as shell from 'shelljs';
import colors from './colors';
import * as cmnd from './shellCommands';
/**
 * Different git commands provide different parameters:
 *  post-merge - single parameter, a status flag, true if a squash merge
 *  post-checkout - three params - ref of prev, ref of new, true if new branch
 */

export let hasWhitespace = (input: string) :boolean=> {
  return input.includes(' ');
}

export const inferGitCommand = (parameters: string) => {

  if (!hasWhitespace(parameters)) {
    return 'merge';
  }

  const paramsArray = convertArgsToArray(parameters);
  
  switch (paramsArray.length) {
    case 1: return 'merge';
    case 3: return 'checkout';
    default: return undefined;
  }
};


export const convertArgsToArray = (input: string) => {
    const ArgsArray = input.split(" ");
    return ArgsArray;
}

// NEW FUNCTION
export const determineGitDisplayFromParameterType = (gitType: any, commandArgs: string) => {

  const parsedArgs = convertArgsToArray(commandArgs); 

  if(gitType === 'checkout' && parsedArgs[0] !== parsedArgs[1]){

      displayCheckoutLog(parsedArgs[0], parsedArgs[1]);

  }
  
  if (gitType === 'merge') {
  
    displayMergeLog();
  
  }
}

// NEW FUNCTION
export const displayMergeLog = () => {

  cmnd.displayGitLog();
    
     const mergeMessage =  cmnd.gitLogAllMerges();
    
     const parsedValue = parseValueWithRegex(`^Merge:\\s(\\w{7,})\\s(\\w{7,})$`, mergeMessage);
   
    if (parsedValue && parsedValue.length != 0) {
      
      const mergeBaseHash =  cmnd.gitLogDiversionHash(parsedValue[1], parsedValue[2]).substring(0, 8);
  
       displayBreakingChanges(mergeBaseHash, parsedValue[2]);
      
    }
}

// NEW FUNCTION
// What is the third argument called? 
export const displayCheckoutLog = (hash1: string, hash2: string) => {

    cmnd.displayGitLog();
  
  
  const gitDiversionHash = cmnd.gitLogDiversionHash(hash1, hash2).substring(0, 8);

  displayBreakingChanges(gitDiversionHash, hash2);

}

export const parseValueWithRegex = (regex: string, mergeMess: string):string[] => {
  const regexVal =  new RegExp(regex, 'm');
  const parsedValue = regexVal.exec(mergeMess);
  if(parsedValue) {
   return parsedValue;
   
  } else {
    return [];
  }
}

export const logBreakingChanges = (result: string) => {
  
  console.log(colors.bg.Red, colors.fg.White, 'BREAKING CHANGES', colors.Reset);
  console.log(colors.bg.Red, colors.fg.White, 'Below are the list of breaking changes:', colors.Reset);
  console.log(colors.fg.Red,`${result}`, colors.Reset);
}

export const displayBreakingChanges = (hash1:string, hash2: string) => {

  const result = cmnd.gitLogGrepChanges(hash1, hash2);
 
 if (result) {
    logBreakingChanges(result);
 }
  
}