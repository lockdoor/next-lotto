import { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    username : {
      type: String, trim: true, index: true,  unique:true, sparse: true
    },
    password: { type: String, trim: true },
    nickname: { type: String, trim: true, unique: true, required: true },
    // discount: { type: Number, default: 0 },
    credit: {type: Number, default: 0},
    role: {
      type: String,
      enum: ["admin", "subadmin", "customer"],
      default: "customer",
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || new model("User", UserSchema);

export default User;
