// Name : Reyes Asher Benedict Calaminos
// Class: DIT/FT/1B/11
// Admin No: 2210979
//

export async function filterByGantryHeight(gantryHeight) {
    const response = await fetch(`http://localhost:8081/byGantryHeight/${parseFloat(gantryHeight)}`)
    const results = await response.json();
    if (!response.ok) {
        throw new Error('network laosai')
    }

    return results;
}

export async function filterByCharacter(characters) {
    const response = await fetch(`http://localhost:8081/readAllCarPark`)
    const results = await response.json();

    return results;
}


