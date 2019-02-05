"use strict";

const loadDataFile = async () => {
    const response = await fetch('../data/data.json')
    return response.json()
}


window.onload = async () => {
    const data = await loadDataFile()
    const airports = data.airports

    for (const airportCode in airports) {
        console.log(airports[airportCode].name)
        // TODO plot airport on map...
    }
}