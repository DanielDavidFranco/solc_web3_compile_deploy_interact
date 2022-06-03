const path = require('path');
const fs = require('fs');
const solc = require('solc');
const fileSystem = require("fs-extra");

const exportPath = path.resolve(__dirname, "bin");
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const contractToCompile = fs.readFileSync(inboxPath, 'utf8');

var input = {
    language: 'Solidity',
    sources: {
             'Inbox.sol': {
              content: contractToCompile
   }
},
    settings: {
              outputSelection: {
              '*': {
                 '*': ['*']
                  }
               }
      }
};

//var compilationOutput = solc.compile(JSON.stringify(input));
//console.log("compilationOutput: ", compilationOutput, typeof(compilationOutput));

console.log("compilationOutput: ", solc.compile(JSON.stringify(input)), typeof(solc.compile(JSON.stringify(input))), '\n');

var objectCompilationOutput = JSON.parse(solc.compile(JSON.stringify(input)),1);
//console.log("objectCompilationOutput: ", objectCompilationOutput, typeof(objectCompilationOutput));
//console.log("objectCompilationOutput['contracts']: ", objectCompilationOutput['contracts'], typeof(objectCompilationOutput['contracts']));
//console.log("objectCompilationOutput['contracts']['Inbox.sol']: ", objectCompilationOutput['contracts']['Inbox.sol'], typeof(objectCompilationOutput['contracts']['Inbox.sol']));
//console.log("objectCompilationOutput['contracts']['Inbox.sol']['Inbox']: ", objectCompilationOutput['contracts']['Inbox.sol']['Inbox'], typeof(objectCompilationOutput['contracts']['Inbox.sol']['Inbox']));
//console.log("objectCompilationOutput['contracts']['Inbox.sol']['Inbox']['evm']: ", objectCompilationOutput['contracts']['Inbox.sol']['Inbox']['evm'], typeof(objectCompilationOutput['contracts']['Inbox.sol']['Inbox']['evm']));
//console.log("objectCompilationOutput['contracts']['Inbox.sol']['Inbox']['evm']['bytecode']: ", objectCompilationOutput['contracts']['Inbox.sol']['Inbox']['evm']['bytecode'], typeof(objectCompilationOutput['contracts']['Inbox.sol']['Inbox']['evm']['bytecode']));
console.log("objectCompilationOutput['contracts']['Inbox.sol']['Inbox'].evm.bytecode.object: ", objectCompilationOutput['contracts']['Inbox.sol']['Inbox'].evm.bytecode.object, typeof(objectCompilationOutput['contracts']['Inbox.sol']['Inbox'].evm.bytecode.object), '\n');
console.log("objectCompilationOutput['contracts']['Inbox.sol']['Inbox'].abi: ", objectCompilationOutput['contracts']['Inbox.sol']['Inbox'].abi, typeof(objectCompilationOutput['contracts']['Inbox.sol']['Inbox'].abi), '\n');
fileSystem.outputJSONSync(
    path.resolve(exportPath, "ABI.json"),
    objectCompilationOutput['contracts']['Inbox.sol']['Inbox'].abi
);
fileSystem.outputJSONSync(
    path.resolve(exportPath,"Bytecode.json"),
    objectCompilationOutput['contracts']['Inbox.sol']['Inbox'].evm.bytecode.object
);

//const compilationOutput = solc.compile(contractToCompile, 1);   // en una version antigua de solc         // https://ethereum.stackexchange.com/questions/63267/solc-compile-0-5-0-is-not-working-like-0-4-version  ;  https://stackoverflow.com/questions/64811118/assertionerror-err-assertion-invalid-callback-object-specified

/** 
objectCompilationOutput.contracts:  {
    'Inbox.sol': {
      Forum: {
        abi: [Array],
        devdoc: [Object],
        evm: [Object],
        ewasm: [Object],
        metadata: '{"compiler":{"version":"0.8.13+commit.abaa5c0e"},"language":"Solidity","output":{"abi":[{"inputs":[{"internalType":"string","name":"_greeting","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"mensajes","outputs":[{"internalType":"string","name":"mensaje","type":"string"},{"internalType":"address","name":"owner","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sayHello","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_newGreeting","type":"string"}],"name":"setGreeting","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"total_mensajes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}],"devdoc":{"kind":"dev","methods":{},"version":1},"userdoc":{"kind":"user","methods":{},"version":1}},"settings":{"compilationTarget":{"Inbox.sol":"Forum"},"evmVersion":"london","libraries":{},"metadata":{"bytecodeHash":"ipfs"},"optimizer":{"enabled":false,"runs":200},"remappings":[]},"sources":{"Inbox.sol":{"keccak256":"0x1e8ac5e85a046ed83430fe57fbf759c6e1d7ee9ccd9db03a84ba3706376ac050","license":"GPL-3.0","urls":["bzz-raw://80fecdba8a6e6e76304e6970eb3d12fffa0aa4e4dac0bcf184df65f8d4f42304","dweb:/ipfs/QmPoT6zidfXWsjSq7pyHPQSpeMnmRAa6TVM12BugGNncCD"]}},"version":1}',
        storageLayout: [Object],
        userdoc: [Object]
      },
      Inbox: {
        abi: [Array],
        devdoc: [Object],
        evm: [Object],
        ewasm: [Object],
        metadata: '{"compiler":{"version":"0.8.13+commit.abaa5c0e"},"language":"Solidity","output":{"abi":[{"inputs":[{"internalType":"string","name":"initialMessage","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"int256","name":"a","type":"int256"},{"internalType":"int256","name":"b","type":"int256"}],"name":"doMath","outputs":[{"internalType":"int256","name":"","type":"int256"},{"internalType":"int256","name":"","type":"int256"},{"internalType":"int256","name":"","type":"int256"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMessage","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"message","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"newMessage","type":"string"}],"name":"setMessage","outputs":[],"stateMutability":"nonpayable","type":"function"}],"devdoc":{"kind":"dev","methods":{},"version":1},"userdoc":{"kind":"user","methods":{"setMessage(string)":{"notice":"en antiguas versiones de Solidity el constructor se construia con una function <nombre_contrato>, ej: function Inbox(string initialMessage) public { message = initialMessage; }"}},"version":1}},"settings":{"compilationTarget":{"Inbox.sol":"Inbox"},"evmVersion":"london","libraries":{},"metadata":{"bytecodeHash":"ipfs"},"optimizer":{"enabled":false,"runs":200},"remappings":[]},"sources":{"Inbox.sol":{"keccak256":"0x1e8ac5e85a046ed83430fe57fbf759c6e1d7ee9ccd9db03a84ba3706376ac050","license":"GPL-3.0","urls":["bzz-raw://80fecdba8a6e6e76304e6970eb3d12fffa0aa4e4dac0bcf184df65f8d4f42304","dweb:/ipfs/QmPoT6zidfXWsjSq7pyHPQSpeMnmRAa6TVM12BugGNncCD"]}},"version":1}',
        storageLayout: [Object],
        userdoc: [Object]
      }
    }
  }
*/