import * as shell from 'shelljs';
import colors from './colors';
/**
 * Different git commands provide different parameters:
 *  post-merge - single parameter, a status flag, true if a squash merge
 *  post-checkout - three params - ref of prev, ref of new, true if new branch
 */
let hasWhitespace = (input: string) :boolean=> {
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

export const inferGitCommandForArr = (params: string[]) => {

  switch (params.length) {
    case 1: return 'merge';
    case 3: return 'checkout';
    default: return undefined;
  }
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


export const GitDiversionValue = (hash1: string, hash2: string) => {

  console.log("first value ", hash1);
    console.log("second value ", hash2);

    const gitCommand = `git merge-base ${hash1} ${hash2}`;

    console.log(gitCommand);

    const gitDiversion = shell.exec(gitCommand);

    return gitDiversion.stdout;
}


export const displayMergeMessage = () => {
  console.log("the type is a merge");
  const gitRepo = shell.exec(`git --no-pager log --merges -1`);
  
  const mergeMessage = gitRepo.stdout;

  console.log('the value is |||' , mergeMessage);

  return mergeMessage;

}

export const displayGitLog = () => {
  console.log(colors.bg.Blue, colors.fg.White, "GIT LOG", colors.Reset);
  const result = shell.exec(`git --no-pager log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative -n 15 --color=always`, {silent:true}).stdout;
  console.log(result);
  console.log("\n");
}

export const displayBreakingChanges = (hash1:string, hash2: string) => {
  const result = shell.exec(`git --no-pager log ${hash2}..${hash1} --grep 'Merge' | grep 'test'`, {silent:true}).stdout;
    
  console.log(colors.bg.Red, colors.fg.White, 'BREAKING CHANGES', colors.Reset);
  console.log(colors.bg.Red, colors.fg.White, 'Below are the list of breaking changes:', colors.Reset);
  console.log(colors.fg.Red,`${result}`, colors.Reset);
}




