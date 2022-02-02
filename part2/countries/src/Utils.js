// Ref: https://www.surfertoday.com/windsurfing/how-to-read-wind-direction
export const getDirectionByDegree = (degree) => {
    const directionDegreeMap = {
        0: 'N',
        11.25: 'NbE',
        22.50: 'NNE',
        33.75: 'NEbN',
        45: 'NE',
        56.25: 'NEbN',
        67.50: 'ENE',
        78.75: 'EbN',
        90: 'E',
        101.25: 'EbS',
        112.50: 'ESE',
        123.75: 'SEbE',
        135: 'SE',
        146.25: 'SEbS',
        157.50: 'SSE',
        168.75: 'SbE',
        180: 'S',
        191.25: 'SbW',
        202.50: 'SSW',
        213.75: 'SWbS',
        225: 'SW',
        236.25: 'SWbW',
        247.50: 'WSW',
        258.75: 'WbS',
        270: 'W',
        281.25: 'WbN',
        292.50: 'WNW',
        303.75: 'NWbW',
        315: 'NW',
        326.25: 'NWbN',
        337.50: 'NNW',
        348.75: 'NbW',
    }
    const degreeList = Object.keys(directionDegreeMap)
    // find the closest degree
    const closestDegree = degreeList.reduce((prev, curr) => {
        return Math.abs(curr - degree) < Math.abs(prev - degree) ? curr : prev
    })
    return directionDegreeMap[closestDegree]
}