const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('board');
const boardCollection = db.collection('board');
const userCollection = db.collection('user');

(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(name) {
  return userCollection.findOne({ name: name });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(name, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    name: name,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

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

function initBoard() {
  let board = loadBoard(25);
  try {
    updateBoard(1,board);
  } catch {
    boardCollection.insertOne({"id":1, "board":board});
  }
}

function getBoard(id) {
  return boardCollection.findOne({ id:id });
}

function updateBoard(id,board) {
  boardCollection.updateOne({id:id},{ $set: { board:board } })
}

async function start() {
  try {
    b = await getBoard(1);
    if (!b.board) {
      initBoard();
    }
  }
  catch {
    initBoard();
  }
}

start();

module.exports = {
  getBoard,
  updateBoard
};