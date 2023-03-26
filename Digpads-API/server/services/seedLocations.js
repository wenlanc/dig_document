const { State, City } = require('../models/db');

let cities = require('./usaCities');

// remote duplicate states
const statesSet = new Set(cities.map(c => c.state ));

// turn into objects for saving
const states = [...statesSet].map(s => ({ name: s }));

seedLocations();

async function seedLocations() {
    await State.insertMany(states);

    console.log(await State.countDocuments());

    cities = await Promise.all(cities.map(async c => {
        const state = await State.findOne({ name: c.state });

        return {
            name: c.city,
            state: state
        };
    }));

    await City.insertMany(cities);
}
