var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
module.exports = app;

var publicPath = path.join(__dirname, '../public');
var indexHtmlPath = path.join(__dirname, '../index.html');

var FlashCardModel = require('./models/flash-card-model');

app.use(express.static(publicPath));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In HTML 5 mode, a page refresh would resolve a 404 Error, the fix here is to push this route to the end,
// declare '/*' as a catch-all, and allow the front-end to handle all routing.
app.get('/', function (req, res) {
    res.sendFile(indexHtmlPath);
});

// If you wanted to serve index.html you'd have to declare a way to access it
// app.get('/index.html', )

app.get('/cards', function (req, res) {
    // return res.status(500).end();
    var modelParams = req.query.category ? { category: req.query.category } : {};

    FlashCardModel.find(modelParams, function (err, cards) {
        setTimeout(function () {
            res.send(cards);
        }, Math.random() * 1000);
    });

});

app.post('/cards', function (req, res, next) {

    // Reference schema for what is expected as the POST body.
    var cardData = req.body;

    FlashCardModel.create(cardData, function (err, card) {
        if (err) return next(err);
        res.json(card);
    });

});
