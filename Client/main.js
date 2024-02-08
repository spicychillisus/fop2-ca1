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
import { filterByGantryHeight, filterOnChar } from "./app.js";

function loadGantryHeightData() {

    filterByGantryHeight().then((carPark)=>{
        const carParkHeight = document.getElementById('carParkHeight').value;
        const activitiesDiv = document.querySelector("#carParkHeight");

        for (let i = 0; i < carParkHeight; i++) {
            let height = carPark[i];
            const heights = document.createElement('car-park-height');
            heights.setAttribute('car_park_no', height.car_park_no);
            heights.setAttribute('address', height.address);
            heights.setAttribute('gantry_height', height.gantry_height);
            activitiesDiv.append(heights);            
        }
    });
}

document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
    loadGantryHeightData();

    document.querySelector("#refreshButton").addEventListener("click", (event)=>{
        document.querySelector("#carParkHeight").replaceChildren();
        loadGantryHeightData();
    });
});

