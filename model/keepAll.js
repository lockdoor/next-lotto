import mongoose, { Schema, models, model } from 'mongoose'

const KeepAllSchema = new Schema({
  date: {type: mongoose.Types.ObjectId, ref: 'Lotto', required: true},
  type: {type: String, enum: ['up3', 'set3up', 'down3','up2', 'down2', 'uprun', 'downrun'], required: true},
  price: {type: Number, required: true},
},{
  timestamps: true
})

const KeepAll = models.KeepAll || new model('KeepAll', KeepAllSchema)

export default KeepAll