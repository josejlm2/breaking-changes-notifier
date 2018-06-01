import * as shell from 'shelljs';
import colors from './colors';
import {gitLogGrepChanges } from './shellCommands';
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

  const paramsArray = parameters.split(' ');
  
  switch (paramsArray.length) {
    case 1: return 'merge';
    case 3: return 'checkout';
    default: return undefined;
  }
};

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

  const result = gitLogGrepChanges(hash1, hash2);
  console.log(result);
 if (result) {
    logBreakingChanges(result);
 }
  
}