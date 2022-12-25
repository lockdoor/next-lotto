import mongoose, { Schema, models, model } from 'mongoose'

const PaymentSchema = new Schema({
  date: {type: mongoose.Types.ObjectId, ref: 'Lotto', required: true},
  user: {type: mongoose.Types.ObjectId, ref: 'User', required: true},
  recorder: {type: mongoose.Types.ObjectId, ref: 'User', required: true},
  payment: {type: Number, required: true, default: 0},
  isFinish: {type: Boolean, required: true, default: false}
},{
  timestamps: true
})

const Payment = models.Payment || new model('Payment', PaymentSchema)

export default Payment