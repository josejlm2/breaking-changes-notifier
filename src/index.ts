import * as yargs from 'yargs';
import { determineGitDisplayFromParameterType, inferGitCommand } from './util';

let args = String(yargs.argv.git_params);

let type = inferGitCommand(args);

determineGitDisplayFromParameterType(type, args)
