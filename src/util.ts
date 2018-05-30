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


