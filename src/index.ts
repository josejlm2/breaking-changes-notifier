
// merge: regex  grep checkout changes for both // git log --merges -l
// checkout: parsing grep checkout changes for both

import * as yargs from 'yargs';
import * as shell from 'shelljs';
import colors from './colors';
import {determineGitDisplayFromParameterType , inferGitCommand}from './util';



let args = String(yargs.argv.git_params);

let type = inferGitCommand(args);

determineGitDisplayFromParameterType(type, args)
 

