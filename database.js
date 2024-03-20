const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('board');
const boardCollection = db.collection('board');

(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

// loadBoard creates a new empty board
function loadBoard(size) {
  let b = [];
  for (let y=0; y<size; y++) {
      let row = [];
      for (let x=0; x<size; x++) {
          row.push("#ffffff");
      }
      b.push(row);
  }
  return b;
}

function init_board() {
  let board = loadBoard(25);
  boardCollection.insertOne({"id":1, "board":board});
}

function update_board(board) {
  boardCollection.updateOne({id:1},board)
}