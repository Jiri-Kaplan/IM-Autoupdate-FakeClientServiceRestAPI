'use strict';

const express = require('express');
const bodyParser = require('body-parser')
const path = require('path')
const config = require('./config.json');
const template = require('./template.json');

// Constants
const HOST = config.host;
const PORT = config.port;

// App
const app = express();
app.use(express.static('images'))
app.use(express.static('scripts'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const updates = [];

function removeUpdate(updateId) {
    for (let i = 0; i < updates.length; i++) {
        let update = updates[i];
        if (update.Id == updateId) {
            updates.splice(i, 1);
            break;
        }
    }
}

//service api
app.put('/updates/:updateId/installed', (req, res) => {
    let instStatus = req.body;
    let updateId = req.params.updateId;
    console.log(`Fake API call: /updates/${updateId}/installed with status: ${instStatus}`);
    res.setHeader('Content-Type', 'application/plain-text');
    res.send('Received installation status: ' + JSON.stringify(instStatus) + ' of update ' + updateId);
});
app.put('/updates/:updateId/dismiss', (req, res) => {
    let updateId = req.params.updateId;
    console.log(`Fake API call: /updates/${updateId}/dismis`);
    res.setHeader('Content-Type', 'application/plain-text');
    res.send('Update dismissed: ' + updateId);
});
app.get('/updates', (req, res) => {
    console.log(`Fake API call: /updates`);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(updates));
});
//editor api
app.get('/editor/template', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(template));
});
app.post('/editor/add', (req, res) => {
    let update = req.body;
    updates.push(update);
    res.setHeader('Content-Type', 'application/plain-text');
    res.send('OK');
});
app.post('/editor/remove', (req, res) => {
    let request = req.body;
    removeUpdate(request.updateId);
    res.setHeader('Content-Type', 'application/plain-text');
    res.send('OK');
});
app.get('/editor/updates', (req, res) => {
    res.sendFile(path.join(__dirname + '/updates.html'));
});
app.get('/editor/clearAll', (req, res) => {
    updates.splice(0, updates.length)
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);