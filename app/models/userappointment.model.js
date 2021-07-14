module.exports = (sequelize, Sequelize) => {
  const userappointment = sequelize.define('userappointments', {
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    }
  })

  return userappointment
}
