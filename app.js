// Name: Reyes Asher Benedict Calaminos
// Class: DIT/FT/1B/11
// Admin No: p2210979

// there seems to be something wrong when i run the server.
// its on http://localhost:8081
// just use the above server if the console gives the response http://::1:8081
// i can't change the server_3v3.js file according to the brief

// modules needed
const fetch = require('node-fetch'); 
const input = require('readline-sync')


// get all data
function getData() {
    let url = 'http://localhost:8081/readAllCarPark';
    
    fetch(url)
    // this is if ur network is good
        .then(response => {
            if (response.ok) {
                console.log("Success!")
            } else {
                console.log("There seems to be an issue.")
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle the retrieved data here
            console.log(data); // Replace this with your handling logic
        })
        .catch(error => {
            // Handle errors here
            console.error('There was a problem with the fetch operation:', error);
            console.log("Error detected. Please see error message.")
        });
}

function surfaceCarPark(byType) {
    let url = `http://localhost:8081/byType/${byType}` // byType is the Surface Car Park types

    fetch(url)
        .then(response => {
            if (response.ok) { // if response is successful
                console.log("Success!")
            } else {
                console.log("There seems to be an issue.")
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle the retrieved data here
            console.log(data); // Replace this with your handling logic
        })
        .catch(error => {
            // Handle errors here
            console.error('There was a problem with the fetch operation:', error);
            console.log("Error detected. Please see error message.")
        });
}

function nightParking(byNightParking) {
    let url = `http://localhost:8081/byType/${byNightParking}` 

    fetch(url)
    // this is if ur network is good
        .then(response => {
            if (response.ok) {
                console.log("Success!")
            } else {
                console.log("There seems to be an issue.")
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle the retrieved data here
            console.log(data); // Replace this with your handling logic
        })
        .catch(error => {
            // Handle errors here
            console.error('There was a problem with the fetch operation:', error);
            console.log("Error detected. Please see error message.")
        });

}

function gantryHeight(byGantryHeight) {
    let url = `http://localhost:8081/byGantryHeight/${byGantryHeight}` // this is declared as an integer

    fetch(url)
    // this is if ur network is good
        .then(response => {
            if (response.ok) {
                console.log("Success!")
            } else {
                console.log("There seems to be an issue.")
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle the retrieved data here
            console.log(data); // Replace this with your handling logic
        })
        .catch(error => {
            // Handle errors here
            console.error('There was a problem with the fetch operation:', error);
            console.log("Error detected. Please see error message.")
        });
}
// menu display

const menu = 
"Select which option you want to do\n" +
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
            getData();
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
            break;
        case 6:
            break;
        case 7:
            break;
        default:
            console.log("Invalid option. Please try again")
            break;
            
    }
}


