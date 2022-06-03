const path = require('path');
const fs = require('fs');
const solc = require('solc');
const fileSystem = require("fs-extra");

const exportPath = path.resolve(__dirname, "bin");
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const contractToCompile = fs.readFileSync(inboxPath, 'utf8');


async function readFile  (filePath) {
    try {
      const data = await fs.promises.readFile(filePath, 'utf8')
      return JSON.parse(data)
    }
   catch(err) {
       return false;
    }
  }

async function writeFile  (filename ,writedata) {
    try {
        await fs.promises.writeFile(filename, JSON.stringify(writedata,null, 4), 'utf8');
        return true
    }
    catch(err) {
        return false
    }
}

async function append_data (filename , data ) {
    /**
     * This function is required in order to append elements to json file resulting in the structure [json_1, json_2, ... , json_n]
     * 
     * https://stackoverflow.com/questions/50747537/how-to-append-json-data-to-existing-json-file-node-js
     */
    if (fs.existsSync(filename)) {
        read_data = await readFile(filename)
        if (read_data == false) {
            console.log('not able to read file', filename)
        }
        else {
            read_data.push(data)
            dataWrittenStatus = await writeFile(filename, read_data)
            if (dataWrittenStatus == true) {
              console.log('data added successfully', filename)
            }
           else{
              console.log('data adding failed', filename)
            }
        }
    }
      else{
          dataWrittenStatus = await writeFile(filename, [data])
          if (dataWrittenStatus == true) {
              console.log('data added successfully', filename)
          }
          else{
             console.log('data adding failed', filename)
           }
      }
   }


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

//console.log("compilationOutput: ", solc.compile(JSON.stringify(input)), typeof(solc.compile(JSON.stringify(input))), '\n');

var objectCompilationOutput = JSON.parse(solc.compile(JSON.stringify(input)),1);

/** 
console.log("objectCompilationOutput['contracts']['Inbox.sol']['Inbox'].evm.bytecode.object: ", objectCompilationOutput['contracts']['Inbox.sol']['Inbox'].evm.bytecode.object, typeof(objectCompilationOutput['contracts']['Inbox.sol']['Inbox'].evm.bytecode.object), '\n');
console.log("objectCompilationOutput['contracts']['Inbox.sol']['Inbox'].abi: ", objectCompilationOutput['contracts']['Inbox.sol']['Inbox'].abi, typeof(objectCompilationOutput['contracts']['Inbox.sol']['Inbox'].abi), '\n');
*/

for (let contract in objectCompilationOutput.contracts['Inbox.sol']) {
    console.log("contract: ", contract)

    append_data(
        path.resolve(exportPath,"ABI.json"),
        objectCompilationOutput.contracts['Inbox.sol'][contract].abi
        )

    append_data(
        path.resolve(exportPath,"Bytecode.json"),
        objectCompilationOutput.contracts['Inbox.sol'][contract].evm.bytecode.object
        )

    append_data(
        path.resolve(exportPath,"Contracts.json"),
        contract
        )

    /** 
    fileSystem.outputJSONSync(
        path.resolve(exportPath,"ABI.json"),
        objectCompilationOutput.contracts['Inbox.sol'][contract].abi
    );

    fileSystem.outputJSONSync(
        path.resolve(exportPath,"Bytecode.json"),
        objectCompilationOutput.contracts['Inbox.sol'][contract].evm.bytecode.object
    );

    fileSystem.outputJSONSync(
        path.resolve(exportPath,"Contracts.json"),
        contract
    );
    */
}