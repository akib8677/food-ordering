import { MenuItems } from "@/app/models/menu-items";
import mongoose from "mongoose";

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const menuItemsDoc = await MenuItems.create(data);
  return Response.json(menuItemsDoc);
}

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const {_id, ...data} = await req.json();
  await MenuItems.findByIdAndUpdate(_id, data)
  return Response.json(true);
}

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  const menuItemsDoc = await MenuItems.find()
  return Response.json(menuItemsDoc);
}

export async function DELETE(req) {
  mongoose.connect(process.env.MONGO_URL);
  const url = new URL(req.url)
  const _id = url.searchParams.get('_id')
  await MenuItems.deleteOne({_id})  
  return Response.json(true);
}