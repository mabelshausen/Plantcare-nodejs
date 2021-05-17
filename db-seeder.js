const faker = require('faker');
const Seeder = require ('mysql-db-seed').Seeder;
const config = require("./db-config");

const seed = new Seeder(
    10,
    config.host,
    config.user,
    config.password,
    config.database
);

(async () => {
    await seed.seed(
        2,
        "rooms",
        {
            name: faker.lorem.word
        }
    );
    await seed.seed(
        4,
        "plants",
        {
            name: faker.lorem.word,
            sciName: faker.lorem.words,
            age: faker.datatype.number,
            room_id: 1,
            waterFreq: 1,
            lastWatered: new Date()
        }
    );
    await seed.seed(
        4,
        "plants",
        {
            name: faker.lorem.word,
            sciName: faker.lorem.words,
            age: faker.datatype.number,
            room_id: 2,
            waterFreq: 1,
            lastWatered: new Date()
        }
    );
    await seed.seed(
        4,
        "plants",
        {
            name: faker.lorem.word,
            sciName: faker.lorem.words,
            age: faker.datatype.number,
            room_id: 3,
            waterFreq: 1,
            lastWatered: new Date()
        }
    );
    seed.exit();
    process.exit();
})();