// SPDX-License-Identifier: GPL-3.0

pragma solidity^0.8.13; 

contract Inbox {

    string public message;
    /* public permite acceder a la variable desde 
    afuera de la red, pues crea un metodo .nombre_de_variable(). */

    constructor(string memory initialMessage) {
        /** 
        Funcion que se evoca con el deployment del contrato
        */

        message = initialMessage;
    }
    /**
    * en antiguas versiones de Solidity el constructor se construia con una function <nombre_contrato>, ej:
    *
    function Inbox(string initialMessage) public {
        
        message = initialMessage;
    }*/


    function setMessage(string memory newMessage) public {
        
        message = newMessage; 
    }

    function getMessage() public view returns (string memory) {    
        /* getMessage() no es necesaria porque uando el contrato se
        deploya, se crea el metodo message() para hacer un call a la variable message, la cual es publica */
        // Hace lo mismo que el metodo message(); 
        // view: promises not to modify the state
        
        return message; // return solo se usa con function_type view o constant
    }

    function doMath(int a, int b) public view returns (int, int, int, bool) {
        /* int==int256, hay: int8 ... int256

        Implica una transaccion. Consume 14 Gas
        (3 en la suma, 3 en la resta, 5 en la multiplicacion
        y 3 en la igualdad _ == _) 
        
        De acuerdo al yellow paper de Ethereum:
        https://github.com/djrtwo/evm-opcode-gas-costs */

        return (a + b, a - b, a * b, a==b);

    } 
    
}


contract Forum {
    string greeting;
    address owner;
    address owner_message;
    uint public total_mensajes;

    modifier onlyOwner {
        require(isOwner(), "Only owner can do that!");
        _;
    }
    
    constructor(string memory _greeting) {
        greeting = _greeting;
        owner = msg.sender;
    }
    
    struct log{
        string mensaje;
        address owner;
    }
    
    log[] public mensajes;
    

    function sayHello() public view returns(string memory, address) {
        if (isOwner()) {
            return ("Hey daddy!",owner);
        } else {
            return (greeting, owner_message);
        }
    }

    function setGreeting(string memory _newGreeting) public {
        mensajes.push(log(_newGreeting,msg.sender));
        greeting= _newGreeting;
        owner_message=msg.sender;
        total_mensajes++;
    }
    
    function isOwner() view private returns(bool) {
        return msg.sender == owner;    
    }
}


/*
https://solidity.readthedocs.io/en/v0.4.24/contracts.html

Visibility and Getters:

Since Solidity knows two kinds of function calls (internal ones that do not 
create an actual EVM call (also called a “message call”) and external ones that do), 
there are four types of visibilities for functions and state variables.

Functions can be specified as being external, public, internal or private, where the 
default is public. For state variables, external is not possible and the default is 
internal.

external:
External functions are part of the contract interface, which means they can be 
called from other contracts and via transactions. An external function f cannot 
be called internally (i.e. f() does not work, but this.f() works). External 
functions are sometimes more efficient when they receive large arrays of data.

public:
Public functions are part of the contract interface and can be either called 
internally or via messages. For public state variables, an automatic getter 
function (see below) is generated.

internal:
Those functions and state variables can only be accessed internally (i.e. from 
within the current contract or contracts deriving from it), without using this.

private:
Private functions and state variables are only visible for the contract they 
are defined in and not in derived contracts.


Note: Everything that is inside a contract is visible to all external observers. 
    Making something private only prevents other contracts from accessing and 
    modifying the information, but it will still be visible to the whole world 
    outside of the blockchain.

View Functions:
Functions can be declared view in which case they promise not to modify the state.
The following statements are considered modifying the state:
    1.Writing to state variables.
    2.Emitting events.
    3.Creating other contracts.
    4.Using selfdestruct.
    5.Sending Ether via calls.
    6.Calling any function not marked view or pure.
    7.Using low-level calls.
    8.Using inline assembly that contains certain opcodes.

Note: constant on functions is an alias to view, but this is deprecated and will be 
    dropped in version 0.5.0.

Pure Functions:
Functions can be declared pure in which case they promise not to read from or 
modify the state.

In addition to the list of state modifying statements explained above, the following 
are considered reading from the state:
    1.Reading from state variables.
    2.Accessing this.balance or <address>.balance.
    3.Accessing any of the members of block, tx, msg (with the exception of msg.sig and msg.data).
    4.Calling any function not marked pure.
    5.Using inline assembly that contains certain opcodes.

Warning: It is not possible to prevent functions from reading the state at the level of 
the EVM, it is only possible to prevent them from writing to the state (i.e. only view 
can be enforced at the EVM level, pure can not).

Fallback Function:
A contract can have exactly one unnamed function. This function cannot have arguments and 
cannot return anything. It is executed on a call to the contract if none of the other 
functions match the given function identifier (or if no data was supplied at all).

Furthermore, this function is executed whenever the contract receives plain 
Ether (without data). Additionally, in order to receive Ether, the fallback function 
must be marked payable. If no such function exists, the contract cannot receive Ether 
through regular transactions.

In the worst case, the fallback function can only rely on 2300 gas being 
available (for example when send or transfer is used), leaving not much room to 
perform other operations except basic logging. The following operations will 
consume more gas than the 2300 gas stipend:
    1.Writing to storage
    2.Creating a contract
    3.Calling an external function which consumes a large amount of gas
    4.Sending Ether
Like any function, the fallback function can execute complex operations as long as 
there is enough gas passed on to it.

Note:
    Even though the fallback function cannot have arguments, one can still use msg.data to 
    retrieve any payload supplied with the call.

Warning:
    Contracts that receive Ether directly (without a function call, i.e. using send or 
    transfer) but do not define a fallback function throw an exception, sending back 
    the Ether (this was different before Solidity v0.4.0). So if you want your contract 
    to receive Ether, you have to implement a fallback function.

Warning:
    A contract without a payable fallback function can receive Ether as a recipient of a 
    coinbase transaction (aka miner block reward) or as a destination of a selfdestruct.

    A contract cannot react to such Ether transfers and thus also cannot reject them. 
    This is a design choice of the EVM and Solidity cannot work around it.

    It also means that this.balance can be higher than the sum of some manual accounting 
    implemented in a contract (i.e. having a counter updated in the fallback function).



https://medium.datadriveninvestor.com/how-to-store-and-locate-memory-data-in-solidity-a9cb284261e1
Storage and memory data locations

Each variable declared and used within a contract features a data location. EVM provides the subsequent four data structures for storing variables:

    Storage: This is often global memory available to all or any functions within the contract. This storage is permanent storage that Ethereum stores on every node within its environment.
    
    Memory: this is often local memory available to each function within a contract. this is often a short-lived and fleeting memory that gets torn down when the function completes its execution.

    Calldata: this is often where all incoming function execution data, including function arguments, is stored. this is often a non-modifiable memory location.

Stack: EVM maintains a stack for loading variables and intermediate values for working with the Ethereum instruction set. this is often working set memory for EVM. A stack is 1,024 levels deep in EVM and if it stores anything quite this it raises an exception. the info location of a variable depends on the subsequent two factors:

    Location of variable declaration
    The data sort of the variable

Based on the preceding two factors, there are rules that govern and choose the info location of a variable. the principles are mentioned here. Data locations also affect the way the assignment operator works. Both assignment and data locations are explained by means of rules that govern them.
( https://medium.datadriveninvestor.com/how-to-store-and-locate-memory-data-in-solidity-a9cb284261e1 )
*/