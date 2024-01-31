import { Category } from "@/app/models/category";
import mongoose from "mongoose";
import { ObjectId } from 'mongoose';

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);
  const { name } = await req.json();
  const categoryDoc = await Category.create({name})
  return Response.json(categoryDoc);
}

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  const categoriesDoc = await Category.find()
  return Response.json(categoriesDoc);
}

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const { name, _id } = await req.json();
  const categoryDoc = await Category.updateOne({_id},{name})
  return Response.json(categoryDoc);
}

export async function DELETE(req) {
  mongoose.connect(process.env.MONGO_URL);
  const url = new URL(req.url)
  const _id = url.searchParams.get('_id')
  await Category.deleteOne({_id})  
  return Response.json(true);
}
