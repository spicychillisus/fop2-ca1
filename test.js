async function test() {
    try{
        let url = `http://localhost:8081/readAllCarPark`

        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('ok')
        }

        const data = await response.json();
        const newData = data.map(item => ({
            car_park_no: item.car_park_no
        }))
        console.log(newData)
    } catch (error) {
        console.error(error)
    }
}

test()