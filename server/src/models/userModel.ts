import mongoose from "mongoose";
import { UserType } from "@src/types";

const userSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["register", "login"],
      default: "register",
    },
    name: {
      type: String,
      required: [true, "Please add your name"],
      trim: true,
      maxLength: [20, "Your name is up to 20 chars long."],
    },
    account: {
      type: String,
      required: [true, "Please add your email or phone"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [isRequiredPassword, "Please add your password"],
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
    },
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

function isRequiredPassword(this: UserType) {
  return this.type === "register";
}

export default mongoose.model<UserType>("user", userSchema);
