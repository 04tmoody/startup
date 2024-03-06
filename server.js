// Import Express
const express = require('express');
const app = express();

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

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetBoard
apiRouter.get('/board', (_req, res) => {
    res.send(board);
});

// SetBoard
apiRouter.put('/board', (_req, res) => {
    board = parseBoard(req.body)
    res.send(board);
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

// The board is saved in memory and disappears when the service restarts
let board = loadBoard(25);
function updateBoard(change,board) {
    try {
        change = change.split(",");
        x = parseInt(change[0]);
        y = parseInt(change[1]);
        color = change[2];
        board[y][x] = color;
    } catch (error) {
        console.log("Bad Input");
    }

}