import mongoose, { Schema, models, model } from 'mongoose'

const BetSchema = new Schema({
  date: {type: mongoose.Types.ObjectId, ref: 'Lotto', required: true},
  user: {type: mongoose.Types.ObjectId, ref: 'User', required: true},
  recorder: {type: mongoose.Types.ObjectId, ref: 'User', required: true},
  type: {type: String, enum: ['up3', 'set3up', 'down3','up2', 'down2', 'uprun', 'downrun'], required: true},
  price: {type: Number, required: true},
  numberString: {type: String, required: true},
  isFree: {type: Boolean, required: true, default: false}
},{
  timestamps: true
})

const Bet = models.Bet || new model('Bet', BetSchema)

export default Bet