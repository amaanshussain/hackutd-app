


export function CalculateDistanceByCoordinates(lat1, long1, lat2, long2) {
    return Math.sqrt(Math.pow((lat2 - lat1), 2) + Math.pow((long2 - long1), 2))
}

export function CalculateMidPointByCoordinates(lat1, long1, lat2, long2) {
    return [lat2 - lat1, long2 - long1]
}