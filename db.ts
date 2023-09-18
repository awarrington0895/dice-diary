import { Database } from 'bun:sqlite'
import { AbilityScores } from '.';

const db = new Database(':memory:')

export function init() {
    const initStatArrayTypeTable = `
        Create Table stat_array_type (
            id Integer Primary Key
            , short_name Text
            , description Text
        );
    `;

    const initStatArrayTable = `
        Create Table stat_array (
            id Integer Primary Key
            , stat_array_type Integer
            , strength Integer
            , dexterity Integer
            , constitution Integer
            , intelligence Integer
            , wisdom Integer
            , charisma Integer
            , total Integer
            , Foreign Key(id) References stat_array_type(id)
        );
    `;

    const initData = `
        Insert Into stat_array_type (short_name, description) Values
        ("Standard array", "Static array of stats used primarily for adventurer's league")
        , ("4D6", "Common random way to get stats.  Roll 4d6, drop the lowest roll and add them up");
    `;

    db.run(initStatArrayTypeTable);
    db.run(initStatArrayTable);
    db.run(initData);
}

export function save(arr: AbilityScores) {
    const stmt = `
        Insert Into stat_array (stat_array_type, strength, dexterity, constitution, intelligence, wisdom, charisma, total)
        Values (?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const stats = arr.scores;

    const sum = stats.reduce((acc, curr) => acc + curr, 0);

    const preparedStatement = db.prepare(stmt)

    preparedStatement.run(arr.type, stats[0], stats[1], stats[2], stats[3], stats[4], stats[5], sum);
}

export function getAllArrays() {
    return db.query("Select * From stat_array;").all();
}

export function getAllTypes() {
    const query = db.query("Select * From stat_array_type");

    return query.all();
}
