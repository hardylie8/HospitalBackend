module.exports = (app) => {
  const appointment = require('../controllers/userappointment.controller.js')

  var router = require('express').Router()

  // Retrieve all appointment
  router.get('/', appointment.findAll)
  // router.get('/:id', appointment.findAllbyId)
  router.get('/:id/:userId', appointment.findOne)
  router.post('/', appointment.create)
  router.delete('/:id/:userId', appointment.delete)
  app.use('/api/userappointment', router)
}
