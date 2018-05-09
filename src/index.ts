#!/usr/bin/env node
//grab provided args.
// const [,, ...args] = process.argv
import * as yargs from 'yargs';
import * as shell from 'shelljs';

// const args = yargs.argv;
const args = process.argv.slice(2);
const colors = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",
    fg: {
     Black: "\x1b[30m",
     Red: "\x1b[31m",
     Green: "\x1b[32m",
     Yellow: "\x1b[33m",
     Blue: "\x1b[34m",
     Magenta: "\x1b[35m",
     Cyan: "\x1b[36m",
     White: "\x1b[37m",
     Crimson: "\x1b[38m" 
    },
    bg: {
     Black: "\x1b[40m",
     Red: "\x1b[41m",
     Green: "\x1b[42m",
     Yellow: "\x1b[43m",
     Blue: "\x1b[44m",
     Magenta: "\x1b[45m",
     Cyan: "\x1b[46m",
     White: "\x1b[47m",
     Crimson: "\x1b[48m"
    }
   };

//print args
console.log('hash1='+ args[0]);
console.log('hash2='+ args[1]);
console.log("show log="+ args[2]);

if(args[2] === '1') {
    console.log(colors.bg.Blue, colors.fg.White, "GIT LOG", colors.Reset);
    shell.exec(`git --no-pager log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative -n 15`);
    console.log("\n");
}

if(args[0] !== args[1]){
    const result = shell.exec(`git --no-pager log ${args[1]}..${args[0]} --grep 'setup repository to being working' | grep 'setup repository to being working'`, {silent:true}).stdout;
    
    console.log(colors.bg.Red, colors.fg.White, 'BREAKING CHANGES', colors.Reset);
    console.log(colors.bg.Red, colors.fg.White, 'Below are the list of breaking changes:', colors.Reset);
    console.log(colors.fg.Red,`${result}`, colors.Reset);
}