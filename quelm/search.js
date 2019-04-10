
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


function search() {
    searchTerm  = document.getElementById("search").value;
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://prkap.app:3000/api/queryES", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("wordindex=" + searchTerm );
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
	    var ipfsimage ="https://ipfs.io/ipfs/"+ data.finalresp.results[0].ipfsimage;
// Simulate a call to Dropbox or other service that can
// return an image as an ArrayBuffer.
            var xhr = new XMLHttpRequest();

// Use JSFiddle logo as a sample image to avoid complicating
// this example with cross-domain issues.
            xhr.open( "GET", ipfsimage, true );

// Ask for the result as an ArrayBuffer.
            xhr.responseType = "arraybuffer";

            xhr.onload = function( e ) {
                // Obtain a blob: URL for the image data.
                var arrayBufferView = new Uint8Array( this.response );
                var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
                var urlCreator = window.URL || window.webkitURL;
                var imageUrl = urlCreator.createObjectURL( blob );
                var img = document.querySelector( "#ipfsimage" );
                img.src = imageUrl;
            };

            xhr.send();

		document.getElementById("ipfsimagelink").href = ipfsimage;
         //  imagename = data.imagename;
         //  document.getElementById("showipfshash").style.visibility="hidden";
         //  document.getElementById("savedimagename").innerHTML=imagename;
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








