const express = require('express');
const ownerController = require('../controllers/ownerControllers');
const router = express.Router();

router.post('/owners', ownerController.addOwner);
router.delete('/owners/:id', ownerController.deleteOwner);
router.post('/owners/:id/vehicles', ownerController.addVehicleToOwner);
router.post('/start-wash', ownerController.startWash);
router.post('/finish-wash', ownerController.finishWash);

module.exports = router;
