// import ethers.js
const ethers = require('ethers')
// network: using the Rinkeby testnet

async function checkBalance() {
    balance = await provider.getBalance('0xbafb4e2dc177de8a3bbadc6030c8e38e510f5ffa');
    console.log("Available ETH: ", ethers.utils.formatEther(balance), " ETH");
}

async function doNothing() {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    await delay(3500);
}

let network = 'rinkeby'
// provider: Infura or Etherscan will be automatically chosen
let provider = ethers.getDefaultProvider(network)
// Sender private key: 
let privateKey = '90ae6181471a02a148f2db4f9fc16c8b05623e0c8fbc19afb2ef32a5bd04f6e0'
// Create a wallet instance
let wallet = new ethers.Wallet(privateKey, provider)
// Receiver Address which receives Ether
let receiverAddress = '0x36ebD4D1cee4E581eda3dCe6d280626b837c8A0f'
// Ether amount to send
let amountInEther = '0.005'
// Create a transaction object
let tx = {
    to: receiverAddress,
    // Convert currency unit from ether to wei
    value: ethers.utils.parseEther(amountInEther)
}
// Send a transaction
wallet.sendTransaction(tx)
.then((txObj) => {
    console.log('txHash', txObj.hash)
    // => 0x9c172314a693b94853b49dc057cf1cb8e529f29ce0272f451eea8f5741aa9b58
    // A transaction result can be checked in a etherscan with a transaction hash which can be obtained here.
})
.then(() => { checkBalance() })
.then(() => { doNothing() });

// https://piyopiyo.medium.com/how-to-send-ether-with-ethers-js-b1bb0b17a855

// https://stackoverflow.com/questions/71375457/how-to-transfer-eth-on-rinkeby-using-ethers-js

// https://stackoverflow.com/questions/32312884/how-do-i-get-the-balance-of-an-account-in-ethereum