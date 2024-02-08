
// Name : Reyes Asher Benedict Calaminos
// Class: DIT/FT/1B/11
// Admin No: p2210979
//

// functions shown below here are the data being fetched from the api
// we will export this function as a module
// fetch api that was used in ca1 has been converted to async and await (for easier purposes)

export async function filterByGantryHeight(gantryHeight) {
    let url = `http://localhost:8081/byGantryHeight/${parseFloat(gantryHeight)}`
    try {
        const response = await fetch(url);
        // error handling..?
        if (!response.ok) {
            throw new Error('haha')
        }
        // fetches the data in a form of json
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error)
    }
}

// filter by car park characters
// we will export this function as a module
export async function filterOnChar(char) {
    let charFilter = char.toUpperCase();
    let url = `http://localhost:8081/readAllCarPark`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const displayData = data
            .filter(cp => cp.car_park_no.toUpperCase().startsWith(charFilter))
            .map(e => ({ 
                car_park_no: e.car_park_no, 
                address: e.address 
            }));
        return displayData;
    } catch (error) {
        throw error;
    }
}


//filterOnChar(carParkNumFilter)