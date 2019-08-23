const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PlantSchema = new Schema({
  matrixIndex: Number,
  name: String,
  description: String,
  optimal_sun: String,
  optimal_soil: String,
  planting_considerations: String,
  when_to_plant: String,
  growing_from_seed: String,
  transplanting: String,
  spacing: String,
  watering: String,
  feeding: String,
  other_care: String,
  diseases: String,
  pests: String,
  harvesting: String,
  storage_use: String, 
  image_url: String
})

module.exports = mongoose.model('Plant', ProductSchema)
