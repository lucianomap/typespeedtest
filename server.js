const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

let leaderboard = [];

app.get('/api/leaderboard', (req, res) => {
    res.json(leaderboard.sort((a, b) => b.wpm - a.wpm).slice(0, 10));
});

app.post('/api/leaderboard', (req, res) => {
    const { name, wpm, accuracy } = req.body;
    leaderboard.push({ name, wpm, accuracy });
    res.status(201).send();
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});