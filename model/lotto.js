import { Schema, models, model } from "mongoose";

const LottoSchema = new Schema(
  {
    date: { type: Date, unique: true, required: true },
    userBet: { type: Boolean, required: true, default: false },
    isOpen: { type: Boolean, required: true, default: true },
    up3: {type: Number, required: true}, 
    down3: {type: Number, required: true}, 
    set3up: {type: Number, required: true}, 
    down2: {type: Number, required: true}, 
    up2: {type: Number, required: true}, 
    uprun: {type: Number, required: true}, 
    downrun: {type: Number, required: true}
  },
  {
    timestamps: true,
  }
);

const Lotto = models.Lotto || new model("Lotto", LottoSchema);

export default Lotto;
