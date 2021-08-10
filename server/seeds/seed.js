const  { User } = require('../models/');
const userSeeds = require('./userSeeds.js')
const db = require('../config/connection');

db.once('open', async () => {
    try {
        await User.deleteMany({});
        await User.create(userSeeds);
        
    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }
    console.log('Success! The database has been seeded. You may proceed.')
    process.exit(0)
});