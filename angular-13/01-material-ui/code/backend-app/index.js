const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const { users } = require('./users');

app.use(cors());

app.get('/users', (_, res) => { 
    setTimeout(() => {
        res.send(users); 
    }, 150);
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
