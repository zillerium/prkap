// Dependencies
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');

const app = express();
const { Pool, Client } = require('pg')

// Certificate
const privateKey = fs.readFileSync('privkey.pem', 'utf8');
const certificate = fs.readFileSync('cert.pem', 'utf8');
const ca = fs.readFileSync('chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

require('dotenv').config();
request = require('request');
const bodyParser = require('body-parser');
var wget=require('node-wget');
var url = require('url');
var path = require('path');
const ipfsAPI = require('ipfs-api');


const ipfs = ipfsAPI('127.0.0.1', '5001', {protocol: 'http'})

let web3 = require('web3');

var convertHex = require('convert-hex')

app.get("/api/ping", function(req, res){
  res.json({ messaage: "pong" });
});

//app.use((req, res) => {
//	res.send('Hello there !');
//});
app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, x-access-token');
  next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/api/savetext", function(req, res) {
    var datatext = req.body.datatext;

    var filename = 'ipfsload.txt'; // replace with a random name if needed

    fs.writeFile(filename, datatext, function(err, data) {
        if (err) res.json({ message: "error",  filename: ''});
        res.json({ message: "Correct",  filename: filename});
    })

});


app.post("/api/buildJson", function(req, res) {
    var blockchain = req.body.blockchain;
    var wallet = req.body.wallet;
    var ipfstexthash=req.body.ipfstexthash;
    var ipfsimagehash = req.body.ipfsimagehash;
// build Json

console.log(blockchain);
	console.log(wallet);
	console.log(ipfstexthash);
	console.log(ipfsimagehash);

let jsonIpfs = {
   wallet: wallet,
    blockchain: blockchain,
    ipfstexthash: ipfstexthash,
    ipfsimagehash: ipfsimagehash
};

let datatext = JSON.stringify(jsonIpfs);

    var filename = 'jsonfile.txt'; // replace with a random name if needed

    fs.writeFile(filename, datatext, function(err, data) {
        if (err) res.json({ message: "error",  filename: ''});
        res.json({ message: "Correct",  filename: filename});
    })

});




app.post("/api/saveipfstext", function(req, res) {

    var filename = req.body.filename;

    let testFile = fs.readFileSync(filename);
    //Creating buffer for ipfs function to add file to the system
    let testBuffer = new Buffer(testFile);

        ipfs.files.add(testBuffer, function (err, file) {
          if (err) {
            res.json({ message: "error",  ipfshash: ''});

          }
          res.json({ message: "Correct",  ipfshash: file});
        })

});

app.post("/api/saveipfsimageurl", function(req, res){
    var imageurl = req.body.imageurl;

    wget(imageurl); // saves image
    var parsed=url.parse(imageurl);
    res.json({ message: "Correct",  imagename: path.basename(parsed.pathname)});
    //Reading file from computer

});


app.post("/api/saveipfsimage", function(req, res){
  var imagename = req.body.imagename;
console.log(imagename);
  //Reading file from computer
  let testFile = fs.readFileSync(imagename);
  //Creating buffer for ipfs function to add file to the system
  let testBuffer = new Buffer(testFile);
      ipfs.files.add(testBuffer, function (err, file) {
          if (err) {
            res.json({ message: "error",  ipfshash: ''});

          }
          res.json({ message: "Correct",  ipfshash: file});

        })

});


// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(3000, () => {
	console.log('HTTP Server running on port 3000');
});

