module.exports = (app) => {
  const appointment = require('../controllers/appointment.controller.js')

  var router = require('express').Router()

  // Create a new Tutorial
  router.post('/', appointment.create)

  // Retrieve all appointment
  router.get('/', appointment.findAll)

  // Retrieve all published appointment
  router.get('/published', appointment.findAllPublished)

  // Retrieve a single Tutorial with id
  router.get('/:id', appointment.findOne)
  router.get('/ua/:id', appointment.findAllbyId)
  // Update a Tutorial with id
  router.put('/:id', appointment.update)

  // Delete a Tutorial with id
  router.delete('/:id', appointment.delete)

  // Delete all appointment
  router.delete('/', appointment.deleteAll)

  app.use('/api/appointment', router)
}
