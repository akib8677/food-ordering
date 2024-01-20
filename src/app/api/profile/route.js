import { User } from "@/app/models/user";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/route";

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const session = await getServerSession(authOption);
  const email = session.user.email;
  if ("name" in data) {
    // update user name
    console.log({email}, {data})
   const res = await User.updateOne({ email }, { name: data.name });
   console.log(res)
  }
  return Response.json(true);
}
