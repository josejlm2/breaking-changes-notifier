import * as util from '../util';
import * as cmnd from '../shellCommands';

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe('utility functions defined in util.ts', () => {

  it('should infer the git command correctly', () => {
    expect(util.inferGitCommand('0')).toEqual('merge');
    expect(util.inferGitCommand('a30cc2869a94f4098c73129f7c66c17b0dae7b15 a83977403ec2d85bee8fbf4a5fc2a656ab503cb3 1')).toEqual('checkout');
    expect(util.inferGitCommand('this is not a param')).toBeUndefined();
  });

  it('determine if string includes whitespace ', () => {
    expect(util.hasWhitespace("string")).toEqual(false);
    expect(util.hasWhitespace('a string with spaces ')).toEqual(true);
  });

  it("displays list of breaking changes", () => {
    const spy = jest.spyOn(console, 'log');
    util.logBreakingChanges('the result')
    expect(spy).toHaveBeenCalledTimes(3);

  });

  it('convert string to an array by space', () => {
    expect(util.convertArgsToArray("this should be an array")).toEqual(['this', 'should', 'be', 'an', 'array']);
  })

  it('convert string with no spaces to an array', () => {
    expect(util.convertArgsToArray("thisshouldbe")).toEqual(['thisshouldbe']);
  })



  it('parsed merge commit should have merge value when matched with regex ', () => {
    const mergeMessage = cmnd.gitLogAllMerges();
    const expected = ['Merge: 1718e82 44ecadb', '1718e82', '44ecadb'];
    expect(util.parseValueWithRegex(`^Merge:\\s(\\w{7,})\\s(\\w{7,})$`, mergeMessage)).toEqual(expect.arrayContaining(expected));
  })

  it('parsed merge commit should not appear when matched with invalid regex statement', () => {
    const mergeMessage = cmnd.gitLogAllMerges();
    const expected: any = [];
    expect(util.parseValueWithRegex(`^Merge:\\s(\\w{7,})\\s(\\w)$`, mergeMessage)).toEqual(expect.arrayContaining(expected));
  })


});


describe('utility functions defined in shellCommands.ts', () => {


  it('return log of all commit messages with BREAKING CHanges in them', () => {
    expect(cmnd.gitLogGrepChanges('a817657', '10bedf2')).toContain('BREAKING CHANGES:');
  });

  it('return nothing when invalid commit hash is passed', () => {
    expect(cmnd.gitLogGrepChanges('a817657', '10bef2')).toContain('');
  });

  it('should retrun long commit hash of length 41', () => {
    expect(cmnd.gitLogDiversionHash('10bedf2', '1718e82')).toHaveLength(41);
  });

  it('should retrun no commit hash when invalid hash is passed', () => {
    expect(cmnd.gitLogDiversionHash('10bef2', '1718e82')).toHaveLength(0);
  });

  it("should contian latest merge message commit", () => {
    expect(cmnd.gitLogAllMerges()).toContain('Merge:');
  });

  it('should display 6 console message in total ', () => {
    const spy = jest.spyOn(console, 'log');
    cmnd.displayGitLog();
    expect(spy).toHaveBeenCalledTimes(3);
  });


});


