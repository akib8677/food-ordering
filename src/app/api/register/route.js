import { User } from "@/app/models/user";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export async function POST(req) {
  const body = await req.json();
  mongoose.connect(process.env.MONGO_URL);
  // const pass = body.password

  // if (!pass.length || pass.length < 5) {
  //   return new Error("Password must be at least 5 characters");
  // }
  // const saltRounds = 10;
  // const salt = bcrypt.genSaltSync(saltRounds);
  // const hash = bcrypt.hashSync(pass, salt);
  // body.password = hash;
  const createdUser = await User.create(body);
  return Response.json(createdUser);
}
