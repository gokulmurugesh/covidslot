import { Schema, model, models } from 'mongoose';

const locationSchema = new Schema({
    centre : String,
    slotsAvailable : Number,
    city : String,
    state : String
})

const Locations = models.location || model('location', locationSchema);
//const Location = mongoose.models && "Location" in mongoose.models ? mongoose.models. Location : mongoose.model("Location", locationSchema);

export default Locations;