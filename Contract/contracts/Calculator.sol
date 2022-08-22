// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;


contract Calculator{

    function add_(uint8 a , uint8 b ) public pure returns(uint8){

        require(a+b>a , " owerflow occured !");
        require(a+b>b , " owerflow occured !");

        return a+b;

    }

    function minus_(uint8 a , uint8 b ) public pure returns(uint8){

        require(a-b<a , " owerflow occured !");
        // require(a-b>=0 , " owerflow occured !");
        if(a-b<0){

            revert("owerflow occured");
        }

     

        return a-b;
        
        

    }

    function multy_(uint8 a , uint8 b ) public pure returns(uint8){

        require(a*b>a , " owerflow occured !");
        require(a*b>b , " owerflow occured !");

        return a*b;

    }

    function divide_(uint8 a , uint8 b ) public pure returns(uint8){

        require(a/b<a , " owerflow occured !");
        return a/b;

    }

}