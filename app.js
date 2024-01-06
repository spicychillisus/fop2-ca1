// Name: Reyes Asher Benedict Calaminos
// Class: DIT/FT/1B/11
// Admin No: p2210979

// there seems to be something wrong when i run the server.
// its on http://localhost:8081
// just use the above endpoint if the console gives the response http://::1:8081

// modules needed
const input = require('readline-sync')

// 1)
// ${encodeURIComponent(params)} is :type
function typesOfCarPark(type) {
    let string = type.toString();
    let parameter = string.toUpperCase();
    let url = `http://localhost:8081/byType/${encodeURIComponent(parameter)}`
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        // filter the data
        .then(data => {
            const newData = data.map(item =>({
                car_park_no: item.car_park_no,
                address: item.address,
                car_park_type: item.car_park_type
            }))
            console.log(newData);
        })
        

}

function typeOfParkingSystem(parkingSystem) {
    let url = `http://localhost:8081/readAllCarPark`; // data is fetched here because no endpoint for type of parking system
    let parkingTypes = ["ELECTRONIC PARKING", "COUPON PARKING"];
    if (parkingSystem == parkingTypes[0]) {
        console.log("Car parks with electronic parking systems:")
    } else if (parkingSystem == parkingTypes[1]) {
        console.log("Car parks with coupon parking systems:")
    }
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
                type_of_parking_system: e.type_of_parking_system
            }))
            const filteredData = newData.filter(e => e.type_of_parking_system == parkingSystem)
            console.log(filteredData)
        })
}

function byNightParking(nightParking) {
    let url = `http://localhost:8081/byNightParking/${encodeURIComponent((nightParking.toString()).toUpperCase())}`
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const newData = data.map(e => ({
                car_park_no: e.car_park_no,
                address: e.address
            }))
            console.log(newData)
        })
}

function filterByGantryHeight(gantryHeight) {
    let url = `http://localhost:8081/byGantryHeight/${Math.round(gantryHeight)}`
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
}

function freeParkingType(parkingType) {
    let url = `http://localhost:8081/readAllCarPark`;
    let freeParkingTypes = ["NO", "SUN & PH FR 1PM-10.30PM", "SUN & PH FR 7AM-10.30PM"];
    if (parkingType == freeParkingTypes[0]) {
        console.log("Here is your data for carparks with no free parking: ")
    }
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
                free_parking: e.free_parking
            }))
            const filteredData = newData.filter(e => e.free_parking == parkingType);
            console.log(filteredData);
        })
}

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

function filterByArea(x1, y1, x2, y2) {
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
            const displayData = data.filter(disp => {
                
            })
            }).map(e => ({
                car_park_no: e.car_park_no,
                address: e.address,
                x_coord: e.x_coord,
                y_coord: e.y_coord
            }))
                
        })
        
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

console.log(menu);
var selection = parseInt(input.question(">> "));

// menu display
if (selection == 1) {
    // object literal to give options to the different types of car park
    let typesOfCP = {
        1: "Basement Car Park",
        2: "Covered Car Park",
        3: "MECHANISED CAR PARK",
        4: "MECHANISED AND SURFACE CAR PARK",
        5: "MULTI-STOREY CAR PARK",
        6: "SURFACE CAR PARK",
        7: "SURFACE/MULTI-STOREY CAR PARK"
    }
    console.log("what type of car park data do u want to see?");
    // menu to give the different types of car park
    const carParks = 
        "1. Basement Car Park\n" +
        "2. Covered Car Park\n" +
        "3. Mechanised Car Park\n" +
        "4. Mechanised and Surface Car Park\n" +
        "5. Multi-Storey Car Park\n" +
        "6. Surface Car Park\n" +
        "7. SURFACE/MULTI-STOREY CAR PARK";
    console.log(carParks)
    const qn = parseInt(input.question(">> "));

    switch(qn) {
        case 1:
            typesOfCarPark(typesOfCP[1]);
            break
        case 2:
            typesOfCarPark(typesOfCP[2]);
            break;
        case 3:
            typesOfCarPark(typesOfCP[3]);
            break;
        case 4:
            typesOfCarPark(typesOfCP[4]);
            break;
        case 5:
            typesOfCarPark(typesOfCP[5]);
            break;
        case 6:
            typesOfCarPark(typesOfCP[6]);
            break;
        case 7:
            typesOfCarPark(typesOfCP[7]);
            break;
        default:
            console.log("Please enter a valid number from 1 to 7.");
            return
    }
} else if (selection == 2) {
    console.log("what type of parking system do u want to see?");
    console.log("1. Coupon Parking");
    console.log("2. Electronic Parking")
    let parkingTypes = ["ELECTRONIC PARKING", "COUPON PARKING"];
    var qn = parseInt(input.question(">> "));
    switch(qn) {
        case 1:
            typeOfParkingSystem(parkingTypes[1])
            break;
        case 2:
            typeOfParkingSystem(parkingTypes[0])
            break;
        default:
            console.log("try again")
            return;
    }

} else if (selection == 3) {
    let parkingChoices = {
        1: "NO",
        2: "SUN & PH FR 1PM-10.30PM",
        3: "SUN & PH FR 7AM-10.30PM"
    }
    console.log("Choose which type you want to see.")
    const parkingSelection = parseInt(input.question(">> "));

    switch(parkingSelection) {
        case 1:
            freeParkingType(parkingChoices[1]);
            break;
        case 2:
            freeParkingType(parkingChoices[2]);
            break;
        case 3:
            freeParkingType(parkingChoices[3]);
            break;
        default:
            console.log("dllm");
            return;
    }
} else if (selection == 4) {
    console.log("1. see car park with night parking")
    console.log("2. see car park with no night parking")
    let choices = ["YES", "NO"];
    const decision = parseInt(input.question(">> "));
    switch(decision) {
        case 1:
            byNightParking(choices[0]);
            break;
        case 2:
            byNightParking(choices[1]);
            break;
        default:
            console.log("please try again please");
            break;
    }
   
} else if (selection == 5) {
    console.log("enter the first x coord:");
    const x_coord_1 = parseFloat(input.question(">> "));
    console.log("enter the second x coord:");
    const x_coord_2 = parseFloat(input.question(">> "))
    console.log("enter the first y coord:");
    const y_coord_1 = parseFloat(input.question(">> "))
    console.log("enter the second y coord:");
    const y_coord_2 = parseFloat(input.question(">> "))

    filterByArea(x_coord_1, y_coord_1, x_coord_2, y_coord_2);

} else if (selection == 6) {
    const validAlphabets = new RegExp("[A-Z]"); // set boundary
    console.log("input the first 1 to 2 characters of a car park number");
    const areaLetters = (input.question(">> ").toUpperCase());
    if (validAlphabets.test(areaLetters) && areaLetters.length <= 2) {
        filterOnChar(areaLetters);
    } else {
        console.log("max of 2 letters")
    }

} else if (selection == 7) {
    console.log("enter a whole number from 2 to 10");
    const height = Math.round(input.question(">> "));
    if (height < 2 || height > 10) {
        console.log("invalid response.")
    } else {
        filterByGantryHeight(height);
    }
} else {
    console.log("invalid option. choose again.")
}

