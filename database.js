const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('rental');
const boardCollection = db.collection('board');

(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getSquare(x,y) {
  return boardCollection.findOne({ x:x, y:y });
}

async function setSquare(x, y, color) {
  const filter = { x:x, y:y };
  const update = { $set: { color: color } };
  await scoreCollection.updateOne(filter, update);
}