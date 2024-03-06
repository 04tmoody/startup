// Import Express
const express = require('express');
const app = express();

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

let board = loadBoard(25);

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetBoard
apiRouter.get('/board', (_req, res) => {
    res.send(board);
});

// SetBoard
apiRouter.post('/board', (req, res) => {
    board = updateBoard(req.body, board)
    res.send(board);
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