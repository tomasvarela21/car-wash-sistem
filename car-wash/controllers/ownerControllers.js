const Owner = require('../models/Owner');
const nodemailer = require('nodemailer');

// Configura el transporte para nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tomas.varelaa19@gmail.com',
        pass: 'tomas.varelaa19-password'
    }
});

exports.addOwner = async (req, res) => {
    try {
        const owner = new Owner(req.body);
        await owner.save();
        res.status(201).send(owner);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteOwner = async (req, res) => {
    try {
        const owner = await Owner.findByIdAndDelete(req.params.id);
        if (!owner) {
            return res.status(404).send();
        }
        res.send(owner);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.addVehicleToOwner = async (req, res) => {
    try {
        const owner = await Owner.findById(req.params.id);
        if (!owner) {
            return res.status(404).send();
        }
        owner.vehicles.push(req.body);
        await owner.save();
        res.send(owner);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.startWash = async (req, res) => {
    try {
        // Aquí puedes agregar lógica para manejar el inicio del lavado
        const { ownerId, vehicleId } = req.body;
        const owner = await Owner.findById(ownerId);
        if (!owner) {
            return res.status(404).send();
        }
        const vehicle = owner.vehicles.id(vehicleId);
        if (!vehicle) {
            return res.status(404).send();
        }
        const startTime = new Date();
        const estimatedEndTime = new Date(startTime.getTime() + 30*60000); // 30 minutos más tarde

        // Enviar correo al propietario
        const mailOptions = {
            from: 'tomas.varelaa19@gmail.com',
            to: owner.email,
            subject: 'Lavado de Auto Comenzado',
            text: `El lavado de su ${vehicle.type} ha comenzado a las ${startTime.toLocaleTimeString()}.`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).send(error);
            } else {
                res.send({ startTime, estimatedEndTime });
            }
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.finishWash = async (req, res) => {
    try {
        const { ownerId, vehicleId } = req.body;
        const owner = await Owner.findById(ownerId);
        if (!owner) {
            return res.status(404).send();
        }
        const vehicle = owner.vehicles.id(vehicleId);
        if (!vehicle) {
            return res.status(404).send();
        }
        const endTime = new Date();
        const price = calculatePrice(vehicle.type);

        // Enviar correo al propietario
        const mailOptions = {
            from: 'tomas.varelaa19@gmail.com',
            to: owner.email,
            subject: 'Lavado de Auto Finalizado',
            text: `El lavado de su ${vehicle.type} ha terminado a las ${endTime.toLocaleTimeString()}. El monto a pagar es ${price} pesos.`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).send(error);
            } else {
                res.send({ endTime, price });
            }
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

const calculatePrice = (type) => {
    switch(type) {
        case 'car':
            return 500;
        case 'motorcycle':
            return 300;
        case 'truck':
            return 800;
        default:
            return 0;
    }
};
