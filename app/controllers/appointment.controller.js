const db = require('../models')
const { authJwt } = require('../middleware')
const Appointment = db.appointment
const User = db.user

const Op = db.Sequelize.Op
exports.create = (req, res) => {
  if (!req.body.DoctorName) {
    res.status(400).send({
      message: 'Content can not be empty!'
    })
    return
  }
  const appointment = {
    DoctorName: req.body.DoctorName,
    Description: req.body.Description,
    Status: req.body.Status
  }
  Appointment.create(appointment)
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
exports.findAll = (req, res) => {
  let DoctorName = req.query.squery
  let Stat = req.query.stat
  if (DoctorName === undefined) {
    DoctorName = ''
  }
  if (Stat === undefined) {
    Stat = ''
  }
  var condition = {
    [Op.or]: [
      {
        DoctorName: {
          [Op.like]: `%${DoctorName}%`
        }
      },
      {
        Description: {
          [Op.like]: `%${DoctorName}%`
        }
      }
    ],
    Status: { [Op.like]: `%${Stat}%` }
  }

  Appointment.findAll({
    where: condition
  })
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
exports.findOne = (req, res) => {
  const id = req.params.id

  Appointment.findByPk(id)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Appointment with id=' + id
      })
    })
}
exports.update = (req, res) => {
  const id = req.params.id

  Appointment.update(req.body, {
    where: { id: id }
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Appointment was updated successfully.'
        })
      } else {
        res.send({
          message: `Cannot update Appointment with id=${id}. Maybe Appointment was not found or req.body is empty!`
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Appointment with id=' + id
      })
    })
}
exports.delete = (req, res) => {
  const id = req.params.id

  Appointment.destroy({
    where: { id: id }
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
exports.findAllPublished = (req, res) => {
  Appointment.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving appointments.'
      })
    })
}
exports.deleteAll = (req, res) => {
  Appointment.destroy({
    where: {},
    truncate: false
  })
    .then((nums) => {
      res.send({ message: `${nums} appointment were deleted successfully!` })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all appointment.'
      })
    })
}
exports.findAllbyId = (req, res) => {
  const id = req.params.id
  Appointment.findAll({
    where: { id: id },
    include: [
      {
        model: User,
        where: {},
        attributes: ['id', 'username']
      }
    ]
  })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Appointment with id=' + id
      })
    })
}
