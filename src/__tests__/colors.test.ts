import colors from '../colors';

describe('console colors file', () => {
  it('should consist of the possible colors to print', () => {
    expect(colors).toMatchSnapshot();
  });
});
