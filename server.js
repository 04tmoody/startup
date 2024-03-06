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