var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 8000;

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.json({ 'Content-type': 'application/json' }));

var server = require('http').Server(app);
server.listen(port, () => {
    console.log(`Server started on port ${port}!`);
});


//parsed using my own way
app.post("/api/v1/parse", function (req, res) {
    var data = req.body.data;
    var splitData = data.split("");
    var array = [];
    var char = "";
    var findString = false;
    for (var i = 0; i < splitData.length; i++) {
        if (splitData[i] == "0" && splitData[i + 1] != "0") {
            findString = true;
        }
        char = char + splitData[i];
        if (findString == true || i == splitData.length - 1) {
            array.push(char);
            char = "";
            findString = false;
        }
    }
    var result = {};
    result.firstName = array[0];
    result.lastName = array[1];
    result.clientId = array[2];
    res.send({ statusCode: 200, data: result });
});

//parsed by using regular expression
app.post("/api/v2/parse", function (req, res) {
    var data = req.body.data;
    var splitData = data.split("");
    var array = [];
    var char = "";
    var findString = false;
    for (var i = 0; i < splitData.length; i++) {
        if (splitData[i] == "0" && splitData[i + 1] != "0") {
            findString = true;
        }
        char = char + splitData[i];
        if (findString == true || i == splitData.length - 1) {
            array.push(char);
            char = "";
            findString = false;
        }
    }
    var result = {};
    result.firstName = array[0].replace(/[0]/g, '');
    result.lastName = array[1].replace(/[0]/g, '');
    result.clientId = formatNumber(array[2]);
    res.send({ statusCode: 200, data: result });
});


function formatNumber(numberString) {
    var cleaned = ('' + numberString).replace(/\D/g, '')
    var match = cleaned.match(/^(\d{3})(\d{4})$/)
    if (match) {
      return  match[1] + '-' + match[2]
    }
    return null
  }