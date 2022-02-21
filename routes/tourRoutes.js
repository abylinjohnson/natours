/* eslint-disable prettier/prettier */
const express = require('express');

const router = express.Router();
const tourController = require('../controllers/tourConroller');

// router.param('id', tourController.checkID);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTour, tourController.getAllTours);
router.route('/tour-stats').get(tourController.getToursStatus);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);
router.route('/').get(tourController.getAllTours).post(tourController.newTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
