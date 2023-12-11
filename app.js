// Name: Reyes Asher Benedict Calaminos
// Class: DIT/FT/1B/11
// Admin No: 2210979

// there seems to be something wrong when i run the server.
// its on http://localhost:8081
// just use the above server if the console gives the response http://::1:8081

// required modules
const input = require('readline-sync')

// modules needed to read the csv fie
const fetch = require('node-fetch'); 
const { response } = require('express');


// data variable from server (mostly taken from endpoint)
let readAllCarPark;
let byType;
let byNightParking;
let byGantryHeight;


// function to load all data
function loadAllData() {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:8081/readAllCarPark')
            .then(response => response.json())

            .then(function (data) {
                resolve(data)

            });
    });
}

// fetch endpoint data
function getCarParkType(cpType) {
    return new Promise((resolve, reject) => {
        const customUrl = 'http://localhost:8081/byType/' + cpType;
        fetch(customUrl)
            .then(response => response.json())

            .then(function (data) {
                resolve(data)

            });
    })
}

// fetches the endpoint data for carparks with night parking
function nightParking(nightPark) {
    return new Promise((resolve, reject) => {
        const customUrlNP = 'http://localhost:8081/byNightParking/' + nightPark;
        fetch(customUrlNP)
            .then(response => response.json())

            .then(function (data) {
                resolve(data)

            });
    })
}

function gantryHeightt(gantryHite) {
    return new Promise((resolve, reject) => {
        const customUrl = 'http://localhost:8081/byGantryHeight/' + parseInt(gantryHite);
        fetch(customUrl)
            .then(response => response.json())

            .then(function (data) {
                resolve(data)

            });
    })
}

// creating async functions

async function getAllData() {
    readAllCarPark = await loadAllData();
}

async function retriveCP() {
    byType = await getCarParkType();
}

async function getNightParking() {
    byNightParking = await nightParking(nightPark);
}

async function getGantryHeight(gantryHeight) {
    byGantryHeight = await gantryHeightt(gantryHeight);
}

getAllData();
retriveCP();

// menu display

const menu = 
"Select which option you wan to do\n" +
"1. Display various types of car park\n" +
"2. Display type of parking system\n" +
"3. Filter free-parking type\n" +
"4. Car parks with night parking\n" +
"5. Filter car parks based on area\n" +
"6. Filter car parks based on certain characters\n" +
"7. Filter car park by gantry height";


// this while loop is for menu selection and for displaying the different options.
while (true) {
    console.log(menu);
    
    var selection = parseInt(input.question(">> "));

    switch(selection) {
        case 1:
            

            break;
            
    }
}


