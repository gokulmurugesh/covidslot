import { Schema, model, models } from 'mongoose';

const bookingSchema = new Schema({
    email: String,
    slotid: String
})

const Bookings = models.booking || model('booking', bookingSchema);
//const booking = mongoose.models && "booking" in mongoose.models ? mongoose.models. booking : mongoose.model("booking", bookingSchema);

export default Bookings;