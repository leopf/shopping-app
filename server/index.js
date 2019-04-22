var express = require('express')
var bodyParser = require('body-parser');
var cors = require('cors');

var handlers = require("./handlers");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/api/usual-item", (req, res) => handlers.getItems(req, res, { isUsual: true }));
app.post("/api/usual-item", (req, res) => handlers.postItem(req, res, { isUsual: true }));
app.put("/api/usual-item", (req, res) => handlers.putItem(req, res, { }));
app.delete("/api/usual-item", (req, res) => handlers.deleteItem(req, res, { }));

app.get("/api/shopping-item", (req, res) => handlers.getItems(req, res, { isUsual: false }));
app.post("/api/shopping-item", (req, res) => handlers.postItem(req, res, { isUsual: false }));
app.put("/api/shopping-item", (req, res) => handlers.putItem(req, res, { }));
app.delete("/api/shopping-item", (req, res) => handlers.deleteItem(req, res, { }));

app.listen(3000);

/**
* delete, post, put:
* /api/usual-item 
* /api/shopping-item
*/
