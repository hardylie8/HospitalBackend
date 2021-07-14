'use strict'
module.exports = (sequelize, Sequelize) => {
  const appointment = sequelize.define('appointment', {
    DoctorName: {
      type: Sequelize.STRING
    },
    Status: {
      type: Sequelize.STRING
    },
    Description: {
      type: Sequelize.STRING
    }
  })

  return appointment
}
