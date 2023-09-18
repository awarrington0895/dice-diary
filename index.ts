import { Random } from "random-js";
import * as db from './db'

enum AbilityScoreGenerator {
    Standard = 1,
    FourD6 = 2,
}

export type AbilityScores = {
    type: AbilityScoreGenerator;
    scores: number[];
}

function fourD6(): AbilityScores {
    const random = new Random();

    const stats: number[] = [];

    for (let i = 0; i < 6; i++) {
        const rolls: number[] = random.dice(6, 4);
        rolls.sort();
        rolls.shift();
        stats.push(rolls.reduce((acc, curr) => acc + curr, 0));
    }

    return {
        scores: stats,
        type: AbilityScoreGenerator.FourD6
    };
}

function standard(): AbilityScores {
    return {
        scores: [15, 14, 13, 12, 10, 8],
        type: AbilityScoreGenerator.Standard
    }
}

db.init();

const testArr = standard();

db.save(testArr);
db.save(fourD6())

console.log(db.getAllArrays());
