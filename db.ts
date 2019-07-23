import * as mongoose from 'mongoose';

let cachedDb = null;

export default async function () {
    if (cachedDb) {
        console.log("using cached db");
        return Promise.resolve(cachedDb);
    }
    console.log("connecting");
    cachedDb = await mongoose.createConnection("mongodb://nabin123:nabin123@ds253857.mlab.com:53857/lambda-todo",
        { bufferCommands: false, bufferMaxEntries: 0 });
    return Promise.resolve(cachedDb);
}