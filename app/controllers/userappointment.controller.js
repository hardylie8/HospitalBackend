const db = require('../models')
const { authJwt } = require('../middleware')
const Userappointment = db.userappointment
const Appointment = db.appointment
const User = db.user
const Op = db.Sequelize.Op
exports.findAll = (req, res) => {
  // const DoctorName = req.query.DoctorName
  // var condition = DoctorName
  //   ? { DoctorName: { [Op.DoctorName]: `%${DoctorName}%` } }
  //   : null
  Userappointment.findAll()
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving Appointments.'
      })
    })
}

exports.create = (req, res) => {
  // if (!req.body.DoctorName) {
  //   res.status(400).send({
  //     message: 'Content can not be empty!'
  //   })
  //   return
  // }
  const userAppointment = {
    id: req.body.id,
    userId: req.body.userId
  }
  Userappointment.create(userAppointment)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Appointment.'
      })
    })
}
// exports.findAllbyId = (req, res) => {
//   const id = req.params.id
//   Userappointment.findAll({
//     where: {},
//     include: [
//       {
//         model: User,
//         where: {}
//       }
//     ]
//   })
//     .then((data) => {
//       res.send(data)
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: 'Error retrieving Appointment with id=' + id
//       })
//     })
// }

exports.findOne = (req, res) => {
  const id = req.params.id
  const userId = req.params.userId
  Userappointment.findAll({ where: { id: id, userId: userId } })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Appointment with id=' + id
      })
    })
}
exports.delete = (req, res) => {
  const id = req.params.id
  const userId = req.params.userId
  Userappointment.destroy({
    where: { id: id, userId: userId }
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Appointment was deleted successfully!'
        })
      } else {
        res.send({
          message: `Cannot delete Appointment with id=${id}. Maybe Appointment was not found!`
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Appointment with id=' + id
      })
    })
}
