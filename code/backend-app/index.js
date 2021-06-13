const express = require('express');
const app = express();
const port = 3000;
const { users } = require('./users');

app.get('/users', (_, res) => { 
    setTimeout(() => {
        res.send(users); 
    }, 150);
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
