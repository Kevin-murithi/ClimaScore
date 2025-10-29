const { Router } = require('express');
const { requireRole } = require('../middleware/authMiddleware');
const farmer = require('../controllers/farmerController');

const router = Router();

// All farmer routes require farmer role
router.use(requireRole(['farmer']));

// Fields
router.post('/fields', farmer.createField);
router.get('/fields', farmer.listFields);
router.get('/fields/:id', farmer.getField);

// Applications
router.post('/applications', farmer.createApplication);
router.get('/applications', farmer.listApplications);

module.exports = router;
