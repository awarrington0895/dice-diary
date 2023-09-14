import { Random } from "random-js";

type StatArray = number[];

function fourD6(): StatArray {
    const random = new Random();

    const stats: number[] = [];

    for (let i = 0; i < 6; i++) {
        const rolls: number[] = random.dice(6, 4);
        rolls.sort();
        rolls.shift();
        stats.push(rolls.reduce((acc, curr) => acc + curr, 0));
    }

    return stats;
}

function standard(): StatArray {
    return [15, 14, 13, 12, 10, 8];
}

console.log(standard());
