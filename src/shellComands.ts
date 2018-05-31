import * as yargs from 'yargs';
import * as shell from 'shelljs';
import colors from './colors';

export const gitLogGrepChanges = (hash1:string, hash2: string) => {

    const result = shell.exec(`git --no-pager log ${hash1}..${hash2} --grep 'BREAKING CHANGES:' | grep 'BREAKING CHANGES'`, {silent:true}).stdout;
    return String(result); 

  }

  export const gitLogDiversionHash = (hash1: string, hash2: string) => {

    const gitCommand = `git merge-base ${hash1} ${hash2}`;

    const gitDiversion = shell.exec(gitCommand);

    return gitDiversion.stdout;
}

export const gitLogAllMerges = () => {
  
    const gitRepo = shell.exec(`git --no-pager log --merges -1`);
    
    const mergeMessage = gitRepo.stdout;
  
    return mergeMessage;
  
}

export const displayGitLog = () => {
    console.log(colors.bg.Blue, colors.fg.White, "GIT LOG", colors.Reset);
    const result = shell.exec(`git --no-pager log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative -n 20 --color=always`, {silent:true}).stdout;
    console.log(result);
    console.log("\n");
  }



