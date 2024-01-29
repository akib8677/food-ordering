import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = Schema(
  {
    name: { String },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      validate: (pass) => {
        if (!pass.length || pass.length < 5) {
          return new Error("Password must be at least 5 characters");
        }
      },
    },
  },
  { timestamps: true }
);

UserSchema.post("validate", function (user) {
  const notHasedPassword = user.password;
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(notHasedPassword, salt);
});

export const User = models?.User || model("User", UserSchema);
