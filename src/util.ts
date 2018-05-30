import * as shell from 'shelljs';
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


export const getGitDiversionValue = (hash1: string, hash2: string) => {

  console.log("first value ", hash1);
    console.log("second value ", hash2);

    const gitCommand = `git merge-base ${hash1} ${hash2}`;

    console.log(gitCommand);

    const gitDiversion = shell.exec(gitCommand);

    console.log("the git diversion is ", gitDiversion.stdout);
}


export const displayMergeMessage = () => {
  console.log("the type is a merge");
  const gitRepo = shell.exec(`git --no-pager log --merges -1`);
  
  const mergeMessage = gitRepo.stdout;

  console.log('the value sis ' , mergeMessage);

  return mergeMessage;

}
