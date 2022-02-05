/* eslint-disable prettier/prettier */
const express = require('express');

const router = express.Router();
const tourController = require('../controllers/tourConroller');

// router.param('id', tourController.checkID);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.newTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
