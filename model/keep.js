import mongoose, { Schema, models, model } from 'mongoose'

const KeepSchema = new Schema({
  date: {type: mongoose.Types.ObjectId, ref: 'Lotto', required: true},
  type: {type: String, enum: ['up3', 'set3up', 'down3','up2', 'down2', 'uprun', 'downrun'], required: true},
  price: {type: Number, required: true},
  numberString: {type: String, required: true}
},{
  timestamps: true
})

const Keep = models.Keep || new model('Keep', KeepSchema)

export default Keep