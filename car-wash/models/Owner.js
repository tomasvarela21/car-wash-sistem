const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    type: String, // 'car', 'motorcycle', 'truck'
    licensePlate: String
});

const ownerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    dni: String,
    phoneNumber: String,
    email: String,
    photoUrl: String,
    vehicles: [vehicleSchema]
});

module.exports = mongoose.model('Owner', ownerSchema);

