## Models

TRIP MODEL

TripSchema {
    name: String,
    description: String,
    members: [Object.IDs]
    places: [placeSchema]
}

PlaceSchema {
    name: String,
    description: String,
    location: {
        type {
            type: String, 
            default: Point,
            coord: [Number]
        }
    }
}

USER MODEL

UserSchema {
    username: String,
    password: String
}

