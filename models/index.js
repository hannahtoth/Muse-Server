// grab db instance 
const { sequelize, synceDb } = require('../db');
const { DataTypes } = require('sequelize')

//grab model funtion
const DefineUser = require('./user')
const DefineGallery = require('./gallery')
const DefineJournal = require('./journal')

const UserModel = DefineUser( sequelize, DataTypes ) // Defines the model
const GalleryModel = DefineGallery( sequelize, DataTypes )
const JournalModel = DefineJournal( sequelize, DataTypes)

// Define Associations 
UserModel.hasMany(GalleryModel)
GalleryModel.belongsTo(UserModel)
JournalModel.belongsTo(JournalModel)

//Sync
synceDb(sequelize, true)

module.exports = {
     UserModel,
     GalleryModel,
     JournalModel

 };