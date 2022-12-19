//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract ContractWinner {
    function callAttempt(address b) external {
        (bool success, ) = b.call(abi.encodeWithSignature("attempt()"));
        require(success);
    }
}
