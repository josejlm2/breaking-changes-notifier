import { inferGitCommand } from '../util';

describe('utility functions defined in util.ts', () => {
  it('should infer the git command correctly', () => {
    expect(inferGitCommand('0')).toEqual('merge');
    expect(inferGitCommand('a30cc2869a94f4098c73129f7c66c17b0dae7b15 a83977403ec2d85bee8fbf4a5fc2a656ab503cb3 1')).toEqual('checkout');
    expect(inferGitCommand('this is not a param')).toBeUndefined();
  };
};
