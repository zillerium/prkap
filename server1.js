// Dependencies
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');

const elasticsearch=require('elasticsearch');

const app = express();
//const { Pool, Client } = require('pg')

const pg = require('pg');

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

const dbpassword = process.env.dbpassword;
const dbuid = process.env.dbuid;

var client = new elasticsearch.Client( {  
  hosts: [
    'http://localhost:9200/',
  ]
});

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


app.post("/api/queryES", function(req, res) {
   var wordindex = req.body.wordindex;
   var searchStr = 'wordindex:' + wordindex;

client.search({
    index: 'blockchain',
    q: searchStr
}).then(function(resp) {
    console.log(resp);
    //resp.hits.hits[0];
//	x.hits.hits[2]._source
    var numberRecs = resp.hits.total;
var allresults = [];
resp.hits.hits.forEach(function(item, index, array) {
 var rec = {
    wallet: item._source.wallet,
    blockchainnetwork: item._source.blockchainnetwork,
    ipfsimage: item._source.ipfsimage,
    ipfstext: item._source.ipfstext,
    wordindex: item._source.wordindex	 
 }
	allresults.push(rec);
	console.log(rec);
	//console.log(item, index);
});
var finalresp = {	
    results: allresults
}
res.json({ message: "Correct", finalresp: finalresp});

}, function(err) {
    console.trace(err.message);
    res.json({ message: "error", errmessage: err.message});

});



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
let v = {
  "name": "John Doe",
  "vegetarian": false,
  "birthDate": "1985-06-02",
  "personalData": {
    "age": 34,
    "height": 1.784
  },
  "postalCode": "12345",
  "nationality": "JP",
  "occupation": "lawyer"
}

let datatext = JSON.stringify(jsonIpfs);

    var filename = 'jsonfile.txt'; // replace with a random name if needed

    fs.writeFile(filename, datatext, function(err, data) {
        if (err) res.json({ message: "error",  filename: ''});
        res.json({ message: "Correct",  filename: filename});
    })

});

app.post("/api/saveDB", function(req, res) {
    var blockchain = req.body.blockchain;
    var wallet = req.body.wallet;
    var ipfstexthash=req.body.ipfstexthash;
    var ipfsimagehash = req.body.ipfsimagehash;
    var addedtext = req.body.addedtext;
    var jsonipfshash = req.body.jsonipfshash;
// build Json

console.log(blockchain);
        console.log(wallet);
        console.log(ipfstexthash);
        console.log(ipfsimagehash);

const pool = new pg.Pool({
    user: dbuid,
    host: '127.0.0.1',
    database: 'blockchain',
    password: dbpassword,
    port: '5432'});

	var ipfs_key = jsonipfshash.replace("https://ipfs.io/ipfs/","");
	var wordindex = addedtext;

sqlinsert = "insert into ipfs (ipfs_key, wallet, blockchainnetwork, ipfsimage, ipfstext, wordindex) values (" +"\'"+ ipfs_key+"\'"+ "," +"\'"+ wallet+"\'"+ ","+"\'"+ blockchain+"\'"+","+"\'"+ ipfsimagehash+"\'"+","+"\'"+ ipfstexthash+"\'"+"," +"\'"+wordindex+"\'"+")";
console.log(sqlinsert);

pool.query(sqlinsert, (err, res) => {
    console.log(err, res);
    pool.end();
});

	// insert into elasticsearch
console.log("** insert into es");	
 client.index({
     index: 'blockchain',
     type: 'uid',	 
     id: ipfs_key,
     body: {
         "wallet": wallet,
         "blockchainnetwork": blockchain,
         "ipfsimage": ipfsimagehash,
         "ipfstext": ipfstexthash,
         "wordindex": wordindex
     }
 }, function(err, resp, status) {
     console.log(resp);
	  console.log(err);

 });


  //  pg.connect(connectionString,function(err,client,done) {
  //     if(err){
  //         console.log("not able to get connection "+ err);
  //         res.status(400).send(err);
  //     } 
  //     client.query('SELECT * FROM student where id = $1', [1],function(err,result) {
  //         done(); // closing the connection;
  //         if(err){
  //             console.log(err);
  //             res.status(400).send(err);
  //         }
  //         res.status(200).send(result.rows);
  //     });
  //  });



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

