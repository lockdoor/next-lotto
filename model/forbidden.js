import mongoose, { Schema, models, model } from 'mongoose'

const ForbiddenSchema = new Schema({
  date: {type: mongoose.Types.ObjectId, ref: 'Lotto', required: true},
  type: {type: String, enum: ['A', 'B', 'C'], required: true},
  numberString: {type: String, required: true}
  
},{
  timestamps: true
})

const Forbidden = models.Forbidden || new model('Forbidden', ForbiddenSchema)

export default Forbidden

/*
 A: อั้นจ่ายครึ่ง
 B: อั้นไม่รับ
 C: อั้นตรงไม่รับจ่ายโต๊ดครึ่ง
*/