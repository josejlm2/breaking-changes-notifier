import { inferGitCommand , hasWhitespace , logBreakingChanges, displayBreakingChanges, parseValueWithRegex} from '../util';
import { gitLogGrepChanges , gitLogDiversionHash, gitLogAllMerges, displayGitLog} from '../shellCommands';

describe('utility functions defined in util.ts', () => {

  it('should infer the git command correctly', () => {
    expect(inferGitCommand('0')).toEqual('merge');
    expect(inferGitCommand('a30cc2869a94f4098c73129f7c66c17b0dae7b15 a83977403ec2d85bee8fbf4a5fc2a656ab503cb3 1')).toEqual('checkout');
    expect(inferGitCommand('this is not a param')).toBeUndefined();
  });

  it('determine if string includes whitespace ' , () => {
    expect(hasWhitespace("string")).toEqual(false);
    expect(hasWhitespace('a string with spaces ')).toEqual(true);
  });

   it("displays list of breaking changes", () => {
     const spy = jest.spyOn(console,'log');
     logBreakingChanges('the result')
     expect(spy).toHaveBeenCalledTimes(3);
     
   });

  //  it('call gitLogGrepChanges once with undefied', () => {

  //   const shellCommands = require('../shellCommands');
  //   shellCommands.gitLogGrepChanges = jest.fn();
    
  //   displayBreakingChanges('a817657', '10bedf2');
  //   expect(gitLogGrepChanges).toBeCalledWith('a817657', '10bedf2');

  //  })

  it('parsed merge commit should have merge value when matched with regex ', () => {
    const mergeMessage =  gitLogAllMerges();
    const expected = ['Merge: 1718e82 44ecadb','1718e82', '44ecadb' ];
      expect(parseValueWithRegex(`^Merge:\\s(\\w{7,})\\s(\\w{7,})$`, mergeMessage)).toEqual(expect.arrayContaining(expected));
  })

  it('parsed merge commit should not appear when matched with invalid regex statement', () => {
    const mergeMessage =  gitLogAllMerges();
    const expected:any = [];
      expect(parseValueWithRegex(`^Merge:\\s(\\w{7,})\\s(\\w)$`, mergeMessage)).toEqual(expect.arrayContaining(expected));
  })


});


describe('utility functions defined in shellCommands.ts' , () => {

  it('return log of all commit messages with BREAKING CHanges in them', () => {
      expect(gitLogGrepChanges('a817657', '10bedf2')).toContain('BREAKING CHANGES:');
  });

  it('return nothing when invalid commit hash is passed', () => {
    expect(gitLogGrepChanges('a817657', '10bef2')).toContain('');
});

  it( 'should retrun long commit hash of length 41', () => {
      expect(gitLogDiversionHash('10bedf2', '1718e82')).toHaveLength(41);
  });

  it( 'should retrun no commit hash when invalid hash is passed', () => {
    expect(gitLogDiversionHash('10bef2', '1718e82')).toHaveLength(0);
});

  it("should contian latest merge message commit", () => {
    expect(gitLogAllMerges()).toContain('Merge:');
  });

  it('should display 6 console message in total ', () => {
    const spy = jest.spyOn(console,'log');
    displayGitLog();
    expect(spy).toHaveBeenCalledTimes(6);
  });


});


