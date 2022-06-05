# solc_web3_compile_deploy_interact
A simple repository to compile, deploy and interact with smart contracts. Plus some extra usefule scripts.


INSTRUCTIONS:

1) npm install --save solc

2) npm list solc   // To see the installed solc.js version

3) If required, modify the pragma solidity^<solc_version> line of the .sol file accordingly.

4) npm install fs-extra

5) node compile.js

6) For proper usage of the sendEth.js file, modify the privateKey and the receiverAddress variables accordingly.


CONTENT:

*Folders:
- /bin/ folder := The compiled bytecodes and ABIs are saved herein.

- /contract/ folder := The smart contract files are saved in here.

- /extra/ folder := Contains additional web3.js-based or ethers.js-based scripts to interact with smart contracts or simply transact in the blockchain from the backend.


*Scripts:
- compile_singleContract.js := Compiles the Inbox contract of the Inbox.sol file and saves the ABI and the Bytecode into the /bin/ folder. NOTE: Better not to execute this script, which is included mostly for the purpose of illustrating how to compile a single contract.

- compile.js := Compiles all the contracts (Inbox & Forum) under the Inbox.sol umbrella, so that both ABIs are stored in /bin/ABI.json file, both bytecodes are saved in /bin/Bytecode.json file, and the order of compilation in both json files is stored into the /bin/Contracts.js .

- deploy.js := Deploys the smart contracts onto a blockchain.

- Inbox.sol := A solidity file containing two simple self-explanatory smart contracts not even interrelated among them.

- sendEth.js := A script for sending ETH from a wallet (for which the private key is known) to another wallet. The vanilla network is Rinkeby Ethereum testnet but you may configure it to work on another network variable.

