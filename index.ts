import { Random } from "random-js";
import * as db from './db'

enum StatArrayType {
    Standard = 1,
    FourD6 = 2,
}

export type StatArray = {
    type: 1 | 2;
    stats: number[];
}

function fourD6(): StatArray {
    const random = new Random();

    const stats: number[] = [];

    for (let i = 0; i < 6; i++) {
        const rolls: number[] = random.dice(6, 4);
        rolls.sort();
        rolls.shift();
        stats.push(rolls.reduce((acc, curr) => acc + curr, 0));
    }

    return {
        stats,
        type: StatArrayType.FourD6
    };
}

function standard(): StatArray {
    return {
        stats: [15, 14, 13, 12, 10, 8],
        type: StatArrayType.Standard
    }
}

db.init();


const testArr = standard();

db.save(testArr);

console.log(db.getAllArrays());
