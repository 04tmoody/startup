// Import Express
const express = require('express');
const app = express();

// Import Database Code
const DB = require('./database.js');

app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

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

let board = [];

async function loadBoard() {
    boardObj = await DB.getBoard(1) //loadBoard(25);
    board = boardObj.board;
}

loadBoard();

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetBoard
apiRouter.get('/board', async (_req, res) => {
    try {
      const board = await DB.getBoard(1);
      res.send(board.board);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error fetching board" });
    }
  });
  
  // SetBoard
  apiRouter.post('/board', async (req, res) => {
    try {
      const updatedBoard = updateBoard(req.body, board);
      await DB.updateBoard(1, updatedBoard);
      res.send(updatedBoard);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error updating board" });
    }
  });

// Serve up public files
app.use(express.static('public'));

// Listen on port
const port = process.argv.length > 2 ? process.argv[2] : 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

// The board is saved in memory and disappears when the service restarts
function updateBoard(change,board) {
    try {
        //change = JSON.parse(change);
        x = change.x;
        y = change.y;
        color = change.color;
        board[y][x] = color;
    } catch (error) {
        console.log("Bad Input: "+change);
    }
    return board;

}