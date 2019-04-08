
address = "0x955a087f81226c49ddec8e5cfef09fdf33be9f9e";

abi = [ { "anonymous": false, "inputs": [ { "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "operator", "type": "address" }, { "indexed": false, "name": "approved", "type": "bool" } ], "name": "ApprovalForAll", "type": "event" }, { "constant": false, "inputs": [ { "name": "tokenId", "type": "uint256" }, { "name": "ipfsHashImage", "type": "string" }, { "name": "ipfsHashText", "type": "string" } ], "name": "addIpfsRecord", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "to", "type": "address" }, { "name": "tokenId", "type": "uint256" } ], "name": "approve", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "to", "type": "address" }, { "name": "tokenId", "type": "uint256" } ], "name": "mint", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "tokenId", "type": "uint256" } ], "name": "safeTransferFrom", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "tokenId", "type": "uint256" }, { "name": "_data", "type": "bytes" } ], "name": "safeTransferFrom", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": true, "name": "tokenId", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "constant": false, "inputs": [ { "name": "to", "type": "address" }, { "name": "approved", "type": "bool" } ], "name": "setApprovalForAll", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "approved", "type": "address" }, { "indexed": true, "name": "tokenId", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "constant": false, "inputs": [ { "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "tokenId", "type": "uint256" } ], "name": "transferFrom", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "constant": true, "inputs": [ { "name": "owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "tokenId", "type": "uint256" } ], "name": "getApproved", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "tokenId", "type": "uint256" } ], "name": "getIpfsRecord", "outputs": [ { "name": "", "type": "string" }, { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "owner", "type": "address" }, { "name": "operator", "type": "address" } ], "name": "isApprovedForAll", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "tokenId", "type": "uint256" } ], "name": "ownerOf", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "interfaceId", "type": "bytes4" } ], "name": "supportsInterface", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" } ]

web3x = new Web3(web3.currentProvider);
web3x.eth.defaultAccount = web3x.eth.accounts[0];
contract = web3x.eth.contract(abi);
var instanceContract = contract.at(address);

function addContractAddress() {
    aContractAddress  = document.getElementById("contractaddress").value;
    instanceContract = contract.at(aContractAddress);
    printSuccessMessage("innermessage","paramessage","Saved")
}


function addipfsimageurlbtn() {
    imageurl  = document.getElementById("addipfsimageurl").value;
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://prkap.app:3000/api/saveipfsimageurl", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("imageurl=" + imageurl );
    xhttp.onreadystatechange = function(){
      var messageDiv = document.getElementById("message");
      if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.response);
        if (data.message != "Correct") {
          printErrorMessage(
            "innermessage",
            "paramessage",
            "Image save failed"
          );

        } else {
           imagename = data.imagename;
           document.getElementById("showipfshash").style.visibility="hidden";
           document.getElementById("savedimagename").innerHTML=imagename;
        }
      }
    };
}

function savetextbtn() {
    datatext  = document.getElementById("addedtext").value;
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://prkap.app:3000/api/savetext", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("datatext=" + datatext );
    xhttp.onreadystatechange = function(){
      var messageDiv = document.getElementById("message");
      if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.response);
        if (data.message != "Correct") {
          printErrorMessage(
            "innermessage",
            "paramessage",
            "Text save failed"
          );

        } else {
           filename = data.filename;
           document.getElementById("showipfstexthash").style.visibility="hidden";
           document.getElementById("savedtextname").innerHTML=filename;
        }
      }
    };
}


function buildJson() {

    var blockchain = document.getElementById("blockchain").value;	
    var wallet = document.getElementById("wallet").value;	
    var ipfstexthash  = document.getElementById("ipfstexthash").innerHTML;
    var ipfsimagehash  = document.getElementById("ipfsimagehash").innerHTML;

    ipfstexthash=ipfstexthash.replace("https://ipfs.io/ipfs/","");
    ipfsimagehash=ipfsimagehash.replace("https://ipfs.io/ipfs/","");

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://prkap.app:3000/api/buildjson", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("wallet=" + wallet + "&ipfstexthash=" + ipfstexthash + "&ipfsimagehash=" + ipfsimagehash + "&blockchain="+blockchain );
    xhttp.onreadystatechange = function(){
      var messageDiv = document.getElementById("message");
      if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.response);
        if (data.message != "Correct") {
          printErrorMessage(
            "innermessage",
            "paramessage",
            "Json build failed"
          );

        } else {
	       filename = data.filename;
               document.getElementById("jsonname").innerHTML=filename;
	       printSuccessMessage("innermessage", "paramessage", "Json Built");

        }
      }
    };


}


function addJsonIpfs() {
    savedjsonname  = document.getElementById("jsonname").innerHTML;
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://prkap.app:3000/api/saveipfstext", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("filename=" + savedjsonname );
    xhttp.onreadystatechange = function(){
      var messageDiv = document.getElementById("message");
      if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.response);
        if (data.message != "Correct") {
          printErrorMessage(
            "innermessage",
            "paramessage",
            "IPFS save json failed"
          );

        } else {
           ipfshash = data.ipfshash[0].hash;
           ipfshash="https://ipfs.io/ipfs/"+ipfshash;
          document.getElementById("jsonipfshash").href=ipfshash;
        //  document.getElementById("paraconfirmowner").innerHTML=ipfshash;
          document.getElementById("jsonipfshash").style.visibility="visible";

        }
      }
    };


}



function addipfstextbtn() {
    savedtextname  = document.getElementById("savedtextname").innerHTML;
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://prkap.app:3000/api/saveipfstext", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("filename=" + savedtextname );
    xhttp.onreadystatechange = function(){
      var messageDiv = document.getElementById("message");
      if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.response);
        if (data.message != "Correct") {
          printErrorMessage(
            "innermessage",
            "paramessage",
            "IPFS save text failed"
          );

        } else {
           ipfshash = data.ipfshash[0].hash;
           ipfshash="https://ipfs.io/ipfs/"+ipfshash;
          document.getElementById("showipfstexthash").href=ipfshash;
          document.getElementById("ipfstexthash").innerHTML=ipfshash;
        //  document.getElementById("paraconfirmowner").innerHTML=ipfshash;
          document.getElementById("showipfstexthash").style.visibility="visible";

        }
      }
    };


}




function addipfsimagebtn() {
    imagename  = document.getElementById("savedimagename").innerHTML;
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://prkap.app:3000/api/saveipfsimage", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("imagename=" + imagename );
    xhttp.onreadystatechange = function(){
      var messageDiv = document.getElementById("message");
      if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.response);
        if (data.message != "Correct") {
          printErrorMessage(
            "innermessage",
            "paramessage",
            "IPFS save image failed"
          );

        } else {
           ipfshash = data.ipfshash[0].hash;
           ipfshash="https://ipfs.io/ipfs/"+ipfshash;
          document.getElementById("showipfshash").href=ipfshash;
          document.getElementById("ipfsimagehash").innerHTML=ipfshash;
        //  document.getElementById("paraconfirmowner").innerHTML=ipfshash;
          document.getElementById("showipfshash").style.visibility="visible";

        }
      }
    };


}

function printErrorMessage(innerHTMLTag, paraTag, Msg) {
    document.getElementById(innerHTMLTag).style.visibility="visible";
    document.getElementById(innerHTMLTag).innerHTML = Msg;
    document.getElementById(innerHTMLTag).classList.add("alert-danger");
    document.getElementById(innerHTMLTag).classList.remove("alert-info");
}

function printSuccessMessage(innerHTMLTag, paraTag, Msg) {
    document.getElementById(innerHTMLTag).style.visibility="visible";
    document.getElementById(innerHTMLTag).innerHTML = Msg;
    document.getElementById(innerHTMLTag).classList.remove("alert-danger");
    document.getElementById(innerHTMLTag).classList.add("alert-info");
}

function mintToken() {

    var mintingaddress  = document.getElementById("mintingaddress").value;
    var minttokenid  = document.getElementById("minttokenid").value;

//    console(mintingaddress);
  //  console(minttokenid);

    instanceContract.mint(mintingaddress, minttokenid, function (e, result){
//        console.log(result);

if (e) {
    printErrorMessage("innermessage", "paramessage", "Mint Error");

} else {
  printSuccessMessage("innermessage", "paramessage", "tokenid txn added");
}

    });

}

function approveToken() {

    var approvingaddress  = document.getElementById("approvingaddress").value;
    var approvetokenid  = document.getElementById("approvetokenid").value;

//    console(mintingaddress);
  //  console(minttokenid);

    instanceContract.approve(approvingaddress, approvetokenid, function (e, result){
//        console.log(result);

if (e) {
    printErrorMessage("innermessage", "paramessage", "Approval Error");

} else {
  printSuccessMessage("innermessage", "paramessage", "approval txn started");
 }


    });

}


function addIpfsBlockchain() {
var ipfstokenid  = document.getElementById("ipfstokenid").value;

    var ipfstexthash  = document.getElementById("ipfstexthash").innerHTML;
    var ipfsimagehash  = document.getElementById("ipfsimagehash").innerHTML;

ipfstexthash=ipfstexthash.replace("https://ipfs.io/ipfs/","");
ipfsimagehash=ipfsimagehash.replace("https://ipfs.io/ipfs/","");


//    console(mintingaddress);
  //  console(minttokenid);

    instanceContract.addIpfsRecord(ipfstokenid,ipfstexthash, ipfsimagehash, function (e, result){
//        console.log(result);

if (e) {
    printErrorMessage("innermessage", "paramessage", "Add Error");

} else {
  printSuccessMessage("innermessage", "paramessage", "add txn started");
 }


    });

}




function confirmToken() {

    var readtokenid  = document.getElementById("readtokenid").value;

    instanceContract.ownerOf( readtokenid, function (e, result){
//        console.log(result);
if (e) {
    printErrorMessage("innermessage", "paramessage", "Owner Error");

} else {
  printSuccessMessage("innermessage", "paramessage", "Owner Shown");
   document.getElementById("paraconfirmowner").innerHTML=result;
instanceContract.getIpfsRecord( readtokenid, function (e, result){
    if (e) {}
    else {
       document.getElementById("readipfstexthash").innerHTML="https://ipfs.io/ipfs/"+result[0];
       document.getElementById("readipfsimagehash").innerHTML="https://ipfs.io/ipfs/"+result[1];
       document.getElementById("readipfstexthash").href="https://ipfs.io/ipfs/"+result[0];
       document.getElementById("readipfsimagehash").href="https://ipfs.io/ipfs/"+result[1];

    }
})

 }


    });

}
function popApprovedAddresses(myarray) {
//var myarray=["first","second"];
var ul=document.getElementById("approvedlist");

for (var i=0;i<myarray.length;i++) {
  var li = document.createElement("li");
  //li.setAttribute('id',myarray[i]);
    li.setAttribute('class',"list-group-item list-group-item-dark");
  li.appendChild(document.createTextNode(myarray[i]));
  ul.appendChild(li);
}

}
function approvedToken() {

    var approvedtokenid  = document.getElementById("approvedtokenid").value;

    instanceContract.getApproved( approvedtokenid, function (e, result){
//        console.log(result);
      //   document.getElementById("paraconfirmowner").innerHTML=result;
      if (e) {
          printErrorMessage("innermessage", "paramessage", "Approval Error");

      } else {
        printSuccessMessage("innermessage", "paramessage", "Approved Accounts Shown");

         popApprovedAddresses(result);
       }



    });

}


function totalOwnedToken() {

    var totalowneraddress  = document.getElementById("totalowneraddress").value;

    instanceContract.balanceOf( totalowneraddress, function (e, result){
//        console.log(result);
if (e) {
    printErrorMessage("innermessage", "paramessage", "Total Owner Error");

} else {
  printSuccessMessage("innermessage", "paramessage", "Total Number of Tokens Shown");

         document.getElementById("totalowned").innerHTML=result;
       }
    });

}

function transferToken() {

    var currentownertokenid  = document.getElementById("currentownertokenid").value;
    var newownertokenid  = document.getElementById("newownertokenid").value;
    var ownedtokenid  = document.getElementById("ownedtokenid").value;

    instanceContract.transferFrom( currentownertokenid,
       newownertokenid, ownedtokenid,
       function (e, result){
//        console.log(result);
if (e) {
    printErrorMessage("innermessage", "paramessage", "Transfer Error");

} else {

       printSuccessMessage("innermessage", "paramessage", "transfer txn started");
}
    });

}
