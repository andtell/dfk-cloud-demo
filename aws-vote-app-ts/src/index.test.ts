import {expect, test, beforeEach} from '@jest/globals';
import { Vote } from './model';

test("can parse input", () => {


    const myVote:Vote = JSON.parse('{"cloud": "aws"}');

    //expect(vote).toBeGreaterThanOrEqual

    expect(myVote).not.toBe(null);

});