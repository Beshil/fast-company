const mongoose = require('mongoose')
const debug = require('debug')('server:db')
const chalk = require('chalk')
const dbConfig = require('../config/db.config')
const models = require('../models')
const bcrypt = require('bcryptjs')

const professionsMock = require('../mockData/professions.json')
const qualitiesMock = require('../mockData/qualities.json')
const usersMock = require('../mockData/users.json')
const e = require('express')

const generateSimpleEntity = (data, model) => {
  return Promise.all(
    data.map(async (example) => {
      try {
        const exm = await model.find({
          name: example.name
        })
        if (exm.length !== 0) {
          return exm[0]
        }
        delete example._id
        const newExm = new model(example)
        await newExm.save()
        return newExm
      } catch (error) {
        return error
      }
    })
  )
}
// const generateUsers=(data,model)=>{

// }
const findProfession = (professionId, professions) => {
  const profession = professionsMock.find((el) => el._id === professionId)
  return professions.find((prof) => prof.name === profession.name)._id
}
const findQualities = (qualitiesIds, qualities) => {
  const qualit = []
  for (const qual of qualitiesMock) {
    for (const qualityId of qualitiesIds) {
      if (qualityId === qual._id) {
        for (const quality of qualities) {
          if (quality.name === qual.name) qualit.push(quality._id)
        }
      }
    }
  }
  return qualit
}

async function setInitialData() {
  const professionsData = await generateSimpleEntity(
    professionsMock,
    models.profession
  )
  if (professionsData) {
    debug(`Professions in DB ${chalk.green('✓')}`)
  } else {
    debug(`Professions error ${chalk.red('x')}`)
  }

  const qualitiesData = await generateSimpleEntity(
    qualitiesMock,
    models.quality
  )
  if (qualitiesData) {
    debug(`Qualities in DB ${chalk.green('✓')}`)
  } else {
    debug(`Qualities error ${chalk.red('x')}`)
  }

  const users = await Promise.all(
    usersMock.map(async (userData) => {
      try {
        const user = await models.user.find({
          email: userData.email
        })
        if (user.length !== 0) {
          return user[0]
        }
        delete userData._id
        userData.profession = findProfession(
          userData.profession,
          professionsData
        )
        userData.qualities = findQualities(userData.qualities, qualitiesData)
        const salt = await bcrypt.genSalt(5)
        userData.password = await bcrypt.hash(userData.password, salt)
        const newUser = new models.user(userData)

        await newUser.save()
        return newUser
      } catch (error) {
        return error
      }
    })
  )
  if (users) {
    debug(`Users in DB ${chalk.green('✓')}`)
  } else {
    debug(`Users error ${chalk.green('x')}`)
  }
}

module.exports = function () {
  mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`)
  var db = mongoose.connection
  db.on(
    'error',
    console.error.bind(console, `${chalk.green('x')} connection error:`)
  )
  db.once('open', function () {
    debug(`MongoDB status: Connected ${chalk.green('✓')}`)
    setInitialData()
  })
}
