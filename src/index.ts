//grab provided args.
// const [,, ...args] = process.argv
import * as yargs from 'yargs';
import * as shell from 'shelljs';
import colors from './colors';

// const args = yargs.argv;
const args = process.argv.slice(2);

//print args
console.log('hash1='+ args[0]);
console.log('hash2='+ args[1]);
console.log("show log="+ args[2]);

if(args[2] === '1') {
  console.log(colors.bg.Blue, colors.fg.White, "GIT LOG", colors.Reset);
  const result = shell.exec(`git --no-pager log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative -n 15 --color=always`, {silent:true}).stdout;
  console.log(result);
  console.log("\n");
}

if(args[0] !== args[1]){
  const result = shell.exec(`git --no-pager log ${args[1]}..${args[0]} --grep 'setup repository to being working' | grep 'setup repository to being working'`, {silent:true}).stdout;
    
  console.log(colors.bg.Red, colors.fg.White, 'BREAKING CHANGES', colors.Reset);
  console.log(colors.bg.Red, colors.fg.White, 'Below are the list of breaking changes:', colors.Reset);
  console.log(colors.fg.Red,`${result}`, colors.Reset);
}
