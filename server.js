const express = require('express');
const http = require('http');
const csvprocessor = require('./csvprocessor');
// const db = require('./db/mongodb');
const db = require('./db/postgres');

const myapp = async () => {

    const cors = require('cors');

    const app = express();

    app.use(express.json());

    app.use(cors({
        origin: '*'
    }))

    const httpServer = http.Server(app);

    app.get('/', (req, res) => {
        csvprocessor(db);
        res.json({ "message": "ok" });
    });

    httpServer.listen(5000, () => {
        console.log("We are listening http server on 5000");
    });
}

myapp();
