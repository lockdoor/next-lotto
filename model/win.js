import mongoose, { Schema, models, model } from 'mongoose'

const WinSchema = new Schema({
  date: {type: mongoose.Types.ObjectId, ref: 'Lotto', required: true, unique:true},
  first: {type: String, required: true, trim: true},
  first3_1: {type: String, required: true, trim: true},
  first3_2: {type: String, required: true, trim: true},
  last3_1: {type: String, required: true, trim: true},
  last3_2: {type: String, required: true, trim: true},
  last2: {type: String, required: true, trim: true},
},{
  timestamps: true
})

const Win = models.Win || new model('Win', WinSchema)

export default Win