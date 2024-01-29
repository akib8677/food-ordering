import { User } from "@/app/models/user";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/route";
import { UserInfo } from "@/app/models/userInfo";

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const { name, image, ...otherUserInfo } = data;
  const session = await getServerSession(authOption);
  const email = session.user.email;
  await User.updateMany({ email }, { name });
  await UserInfo.findOneAndUpdate({ email }, otherUserInfo, { upsert: true });
  return Response.json(true);
}

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  const session = await getServerSession(authOption);
  const email = session?.user?.email;
  if (!email) {
    return Response.json({});
  }
  const users = await User.findOne({ email }).lean();
  const usersInfo = await UserInfo.findOne({ email }).lean();
   return Response.json({ ...users, ...usersInfo });
}
