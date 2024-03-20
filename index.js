// Import Express
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();

const authCookieName = 'token';

// Import Database Code
const DB = require('./database.js');

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
    if (await DB.getUser(req.body.name)) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const user = await DB.createUser(req.body.name, req.body.password);
  
      // Set the cookie
      setAuthCookie(res, user.token);
  
      res.send({
        id: user._id,
      });
    }
  });

  // GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
    const user = await DB.getUser(req.body.name);
    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        setAuthCookie(res, user.token);
        res.send({ id: user._id });
        return;
      }
    }
    res.status(401).send({ msg: 'Unauthorized' });
  });

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
    res.clearCookie(authCookieName);
    res.status(204).end();
  });

  // GetUser returns information about a user
apiRouter.get('/user/:name', async (req, res) => {
    const user = await DB.getUser(req.params.name);
    if (user) {
      const token = req?.cookies.token;
      res.send({ name: user.name, authenticated: token === user.token });
      return;
    }
    res.status(404).send({ msg: 'Unknown' });
  });
  
  // secureApiRouter verifies credentials for endpoints
  var secureApiRouter = express.Router();
  //apiRouter.use(secureApiRouter);
  
  secureApiRouter.use(async (req, res, next) => {
    authToken = req.cookies[authCookieName];
    const user = await DB.getUserByToken(authToken);
    if (user) {
      next();
    } else {
      res.status(401).send({ msg: 'Unauthorized' });
    }
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

let board = [];

async function loadBoard() {
    boardObj = await DB.getBoard(1) //loadBoard(25);
    board = boardObj.board;
}

loadBoard();

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
  secureApiRouter.post('/board', async (req, res) => {
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

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
  }

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