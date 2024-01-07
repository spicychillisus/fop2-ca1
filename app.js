// Name: Reyes Asher Benedict Calaminos
// Class: DIT/FT/1B/11
// Admin No: p2210979

// there seems to be something wrong when i run the server.
// its on http://localhost:8081
// just use the above endpoint if the console gives the response http://::1:8081

// modules needed
// node-fetch has been installed. to check, you can refer to the package.json
// fetch is an inbuilt module.
const input = require('readline-sync')

function typesOfCarPark(type) {
    
    if (type == "Show All Types") {
        async function showAll() {
            try {
                let option8 = `http://localhost:8081/readAllCarPark`;
                const response = await fetch(option8)
                if (!response.ok) {
                    throw new Error ('Network response was not ok')
                }
    
                const data = await response.json()
                const displayData = data.map(item => ({
                    car_park_no: item.car_park_no,
                    address: item.address,
                    car_park_type: item.car_park_type
                }))
                console.log(displayData)
            } catch (error) {
                console.error(error)
            }
        }
        showAll();
    } else {
        // if the user wishes to see individual car park types
        let url = `http://localhost:8081/byType/${encodeURIComponent((type.toString()).toUpperCase())}` 
        // ${encodeURIComponent((type.toString()).toUpperCase())} is :type
    
        fetch(url) // fetch is promise based
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
                console.log(newData)
            })
            .catch(error => { // this does error handling
                console.error(error)
            })
    }
        

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
                throw new Error('there seems to be an issue...')
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
        .catch(error => {
            console.error(error)
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

function freeParkingType(parkingType) {
    let url = `http://localhost:8081/readAllCarPark`;
    let freeParkingTypes = ["NO", "SUN & PH FR 1PM-10.30PM", "SUN & PH FR 7AM-10.30PM"]; // the free parking types that are provided in the .csv file
    if (parkingType == freeParkingTypes[0]) {
        console.log("Here is your data for carparks with no free parking: ")
    } else if (parkingType == freeParkingTypes[1]) {
        console.log("here is your data for carparks with free parking on sunday and public holiday from 1pm to 10:30pm")
    } else if (parkingType == freeParkingTypes[2]) {
        console.log("here is your data for car parks with free parking on sunday and public holiday from 7am to 10:30pm ")
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
        .catch(error => {
            console.error(error)
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
    let url = `http://localhost:8081/readAllCarPark`; // no endpoint has been made for coordinates
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error("error issues")
            }
        })
        .then(data => {
            const newData = []; // store the response in here
            data.forEach(axis => {
                // checks if there are any values in between before printing out the response
                // x1 is the top left x axis coordinates
                // x2 is the bottom right x axis coordinates
                // y1 is the top right y axis coords
                // y2 is the bottom left y axis coordinates
                if (axis.x_coord >= x1 && axis.x_coord <= x2 && axis.y_coord >= y1 && axis.y_coord <= y2) { // this statement finds the in between
                    newData.push({
                        car_park_no: axis.car_park_no,
                        address: axis.address,
                        x_coord: axis.x_coord,
                        y_coord: axis.y_coord
                    })
                }
            })
            
            console.log(newData)
        })
        .catch(err => {
            console.error(err)
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





while (true) {
    // you need to enter a number from the option and only then it will show the data. after the data is shown the program will end
    // if not, the menu will keep prompting you enter a number from the option
    console.log(menu);
    var selection = parseFloat(input.question(">> ")); // parseFloat does not allow decimal values for input


    if (selection == 1) {
        console.log("what type of car park data do u want to see?");
        // menu to give the different types of car park
        const carParks = 
            "1. Basement Car Park\n" +
            "2. Covered Car Park\n" +
            "3. Mechanised Car Park\n" +
            "4. Mechanised and Surface Car Park\n" +
            "5. Multi-Storey Car Park\n" +
            "6. Surface Car Park\n" +
            "7. SURFACE/MULTI-STOREY CAR PARK\n" +
            "8. Show All Types"
            
        console.log(carParks)
        const qn = parseInt(input.question(">> "));
        // object literal to give options to the different types of car park
        // CP = car park
        let typesOfCP = {
            1: "Basement Car Park",
            2: "Covered Car Park",
            3: "MECHANISED CAR PARK",
            4: "MECHANISED AND SURFACE CAR PARK",
            5: "MULTI-STOREY CAR PARK",
            6: "SURFACE CAR PARK",
            7: "SURFACE/MULTI-STOREY CAR PARK",
            8: "Show All Types"
        }
        if (qn == 1) {
            return typesOfCarPark(typesOfCP[1]);

        } else if (qn == 2) {
            return typesOfCarPark(typesOfCP[2]);

        } else if (qn == 3) {
            return typesOfCarPark(typesOfCP[3]);

        } else if (qn == 4) {
            return typesOfCarPark(typesOfCP[4]);

        } else if (qn == 5) {
            return typesOfCarPark(typesOfCP[5]);

        } else if (qn == 6) {
            return typesOfCarPark(typesOfCP[6]);

        } else if (qn == 7) {
            return typesOfCarPark(typesOfCP[7]);

        } else if (qn == 8){
            return typesOfCarPark(typesOfCP[8])

        } else {
            console.log("Please enter a valid number from 1 to 7.");
        }
    } else if (selection == 2) {
        console.log("what type of parking system do u want to see?");
        console.log("1. Coupon Parking");
        console.log("2. Electronic Parking")
        let parkingTypes = ["ELECTRONIC PARKING", "COUPON PARKING"]; // types of parking schemes available based on .csv file
        var qn = parseInt(input.question(">> "));
        if (qn == 1) {
            return typeOfParkingSystem(parkingTypes[1])
        } else if (qn == 2) {
            return typeOfParkingSystem(parkingTypes[0])
        } else {
            console.log("try again")
        }
    
    } else if (selection == 3) {
        let parkingChoices = {
            1: "NO",
            2: "SUN & PH FR 1PM-10.30PM",
            3: "SUN & PH FR 7AM-10.30PM"
        }
        console.log("Choose which type you want to see.")
        const menu = 
            "1. No free parking\n" +
            "2. Free parking on SUN & PH FR 1PM-10.30PM\n" +
            "3. Free parking on SUN & PH FR 7AM-10.30PM"
        
        // makes sure that the program loops if the user enters a number that is not 1, 2 or 3
        while (true) {
            console.log(menu);
            const parkingSelection = parseInt(input.question(">> "));
            if (parkingSelection == 1) {
                return freeParkingType(parkingChoices[1]);
            } else if (parkingSelection == 2) {
                return freeParkingType(parkingChoices[2]);
            } else if (parkingSelection == 3) {
                return freeParkingType(parkingChoices[3]);
            } else {
                console.log("something went wrong. please try again.");
            }
        }

    } else if (selection == 4) {
        console.log("1. see car park with night parking")
        console.log("2. see car park with no night parking")
        let choices = ["YES", "NO"];
        const decision = parseInt(input.question(">> "));

        // program loops until user throws valid input
        while (true) {
            if (decision == 1) {
                return byNightParking(choices[0]);
            } else if (decision == 2) {
                return byNightParking(choices[1]);
            } else {
                console.log("please try again please");
            }
        }
       
    } else if (selection == 5) {
        console.log("enter the first x coord (this is the top left x coordinate):");
        const x_coord_1 = parseFloat(input.question(">> ")); // top left x coordinate
        console.log("enter the second x coord. this has to be bigger than the first x coord (this is top right x coordinate):");
        const x_coord_2 = parseFloat(input.question(">> ")) // top right x coordinate
        console.log("enter the first y coord (this is bottom left y coordinate):");
        const y_coord_1 = parseFloat(input.question(">> ")) // bottom left y coordinate
        console.log("enter the second y coord. this needs to be bigger than the first y coord (this is bottom right y coordinate):");
        const y_coord_2 = parseFloat(input.question(">> ")) // bottom right right y coordinate
    
        return filterByArea(x_coord_1, y_coord_1, x_coord_2, y_coord_2);
    
    } else if (selection == 6) {
        const validAlphabets = new RegExp("[A-Za-z0-9]")        ; // set boundary
        console.log("input the first 4 characters of a car park number");
        const areaLetters = (input.question(">> ").toUpperCase());
        if (validAlphabets.test(areaLetters) && areaLetters.length <= 4) {
            return filterOnChar(areaLetters);
        } else {
            console.log("max of 4 characters and use only alphabets or numbers")
        }
    
    } else if (selection == 7) {
        console.log("enter a whole number from 2 to 10");
        const height = parseFloat(input.question(">> ")); // decimal values will be rounded to the next integer
        if (height < 2 || height > 10) {
            console.log("invalid response.")
        } else {
            return filterByGantryHeight(height);
        }
    } else {
        console.log("invalid option. choose again.")
    }
    
    
}

