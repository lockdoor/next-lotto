import mongoose, { Schema, models, model } from 'mongoose'

const DiscountSchema = new Schema({
  lottoDateId: {type: mongoose.Types.ObjectId, ref: 'Lotto', required: true},
  user: {type: mongoose.Types.ObjectId, ref: 'User', required: true},
  discount: {type: Number, required: true, default: 0},
  date: {type: Date, require: true}
},{
  timestamps: true
})

const Discount = models.Discount || new model('Discount', DiscountSchema)

export default Discount

