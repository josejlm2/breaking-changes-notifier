//grab provided args.
// const [,, ...args] = process.argv

// merge: regex  grep checkout changes for both // git log --merges -l
// checkout: parsing grep checkout changes for both
// if there are no breaking changes extract the value out 
console.log('test');

import * as yargs from 'yargs';
import * as shell from 'shelljs';
import colors from './colors';
import { inferGitCommand , parseValueWithRegex , getGitDiversionValue, displayMergeMessage} from './util';

let args = String(yargs.argv.git_params);
// const args = process.argv.slice(2);
console.log(typeof args);

let type = inferGitCommand(args);
console.log(type);


 const parsedArgs = args.split(" ");

 console.log(parsedArgs);

//print args
console.log('hash1='+ parsedArgs[0]);
console.log('hash2='+ parsedArgs[1]);
console.log("show log="+ parsedArgs[2]);

if(parsedArgs[2] === '1') {
  console.log(colors.bg.Blue, colors.fg.White, "GIT LOG", colors.Reset);
  const result = shell.exec(`git --no-pager log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative -n 15 --color=always`, {silent:true}).stdout;
  console.log(result);
  console.log("\n");
  

  
}

 // console.log("the type is checkout");
if(parsedArgs[0] !== parsedArgs[1]){
  const result = shell.exec(`git --no-pager log ${parsedArgs[1]}..${parsedArgs[0]} --grep 'test' | grep 'test'`, {silent:true}).stdout;
    
  console.log(colors.bg.Red, colors.fg.White, 'BREAKING CHANGES', colors.Reset);
  console.log(colors.bg.Red, colors.fg.White, 'Below are the list of breaking changes:', colors.Reset);
  console.log(colors.fg.Red,`${result}`, colors.Reset);
}


if (type == 'checkout') {

}


if (type === 'merge') {
  
   const mergeMessage =  displayMergeMessage();
  
   const parsedValue = parseValueWithRegex(`^Merge:\\s(\\w{7,})\\s(\\w{7,})$`, mergeMessage);

  if (parsedValue && parsedValue.length != 0) {
    
     getGitDiversionValue(parsedValue[1], parsedValue[2]);

  }

}

