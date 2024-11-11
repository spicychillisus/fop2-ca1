// Name : Reyes Asher Benedict Calaminos
// Class: DIT/FT/1B/11
// Admin No: p2210979
//

// the main JS file that will handle fetched data to front end work

// get variables from html file
const carParkLetters = document.getElementById('carParkLetters').value;
const carParkNumber = document.getElementById('carParkNumber').value;

// merge the 2 variables together to form a new variable
const carParkNumFilter = carParkLetters + carParkNumber;

// import the functions from app.js
import { filterByGantryHeight, filterOnChar} from "./app.js";

function loadCarParkHeights() {

    filterByGantryHeight().then((data)=>{
        const carParks = document.querySelector("#carParkHeightss").value;
        const heightDiv = document.querySelector("#carParkHeightDisplay");

        // for loop to display the data in the web component
        for (let i = 0; i < carParks; i++) {
            let data = carParks[i];
            const heights = document.createElement('car-park-height');
            heights.setAttribute('car_park_no', data.car_park_no);
            heights.setAttribute('address', data.address);
            heights.setAttribute('gantry_height', data.gantry_height);
            heightDiv.append(heights);            
        }
    });
}

document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
    loadCarParkNum();

    document.querySelector("#submit").addEventListener("click", (event)=>{
        document.querySelector("#carParkHeightDisplay").replaceChildren();
        loadCarParkNum();
    });
});


function loadCarParkNum() {

    filterOnChar().then((data)=>{


        for (let i = 0; i < carParkNumFilter; i++) {
            let data = populationArray[i];
            const heights = document.createElement('car-park-character');
            heights.setAttribute('car_park_no', data.car_park_no);
            heights.setAttribute('address', data.address);
            heightDiv.append(heights);            
        }
    });
}

document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
    loadCarParkHeights();

    document.querySelector("#submit").addEventListener("click", (event)=>{
        document.querySelector("#carParkNumDisplay").replaceChildren();
        loadCarParkHeights();
    });
});