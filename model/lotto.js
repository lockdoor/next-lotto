import { Schema, models, model } from "mongoose";

const LottoSchema = new Schema(
  {
    date: { type: Date, unique: true, required: true },
    userBet: { type: Boolean, required: true, default: false },
    isOpen: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
  }
);

const Lotto = models.Lotto || new model("Lotto", LottoSchema);

export default Lotto;
