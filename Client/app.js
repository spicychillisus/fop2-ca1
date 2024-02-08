
// Name : Reyes Asher Benedict Calaminos
// Class: DIT/FT/1B/11
// Admin No: p2210979
//

// get variables from html file
const carParkLetters = document.getElementById('carParkLetters');
const carParkNumber = document.getElementById('carParkNumber');
const carParkHeight = document.getElementById('carParkHeight');
const carParkNumFilter = carParkLetters + carParkNumber;

//import { filterByGantryHeight, filterByCharacter } from './fetch.js';


// functions shown below here are the data being sent to the front end
function filterByGantryHeight(gantryHeight) {
    let url = `http://localhost:8081/byGantryHeight/${parseFloat(gantryHeight)}`
    // ${parseFloat(gantryHeight)}: this part allows the user to enter any decimal or whole number they wish
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('network laosai')
            }
        })
        .then(data => {
            const newData = data.map(e => ({
                car_park_no: e.car_park_no,
                address: e.address,
                gantry_height: e.gantry_height
            }))
            console.log(newData)
        })
        .catch(error => {
            console.error(error)
        })
}

document.addEventListener("DOMContentLoaded", (event) => {
    
})

// filter by car park characters
function filterOnChar(char) {
    let charFilter = (char.toUpperCase().toString())
    let url = `http://localhost:8081/readAllCarPark`;
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('network laosai')
            }
        })
        .then(data => {
            const displayData = data
                                    .filter(cp => {
                                        let result = cp.car_park_no.toUpperCase().startsWith(charFilter); // gives out results based on the characters inputted
                                        return result;
                                    }).map(e => ({
                                        car_park_no: e.car_park_no,
                                        address: e.address
                                    }))
            console.log(displayData)
        })
        .catch(error => {
            console.error(error);
        })

}

filterOnChar(carParkNumFilter)