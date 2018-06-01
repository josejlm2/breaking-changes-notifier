import * as util from '../util';

describe('logBreakingChanges function in util.js', () => {

    it('call gitLogGrepChanges once with undefined result parameter', () => {

        const shellCommands = require('../shellCommands');
        shellCommands.gitLogGrepChanges = jest.fn();

        util.displayBreakingChanges('a817657', '10bedf2');
        expect(shellCommands.gitLogGrepChanges).toBeCalledWith('a817657', '10bedf2');

    })

    it('call gitLogGrepChanges once with defined result parameter', () => {

        const shellCommands = require('../shellCommands');
        shellCommands.gitLogGrepChanges = jest.fn(() => 4);

        util.displayBreakingChanges('a817657', '10bedf2');
        expect(shellCommands.gitLogGrepChanges).toBeCalledWith('a817657', '10bedf2');

    })

});