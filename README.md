# Gale Shapley algorithm implementation in nodejs.

## Requirements 
Built and tested on Ubuntu 18.04
node v8.15.0

## Introduction
This code was written for my Algorithm Design class taught by Dr. C Kirabas
at University of Dayton.

The input file contains a JSON (JavaScript Object Notation) with 
the preferences of the men and women that need to be matched.

To maintain simplicity all the men and women have been assigned a unique ID
Men have been assigned even numbers  : [0, 2, 4, ..]
Women have been assigned odd numbers : [1, 3, 5, ..]

## Usage
To invoke the program run :
node index.js <input_file>

To save the console logs to a file run :
node index.js <input_file>   >   <log_file>

To generate random preference for n men and women run :
node input.js <output_file> <n>
