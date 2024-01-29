import { Category } from "@/app/models/category";

export async function POST(req) {
  const { name } = await req.json();
  const categoryDoc = await Category.create({name})
  return Response.json(categoryDoc);
}

export async function GET() {
  const categoriesDoc = await Category.find()
  return Response.json(categoriesDoc);
}

export async function PUT(req) {
  const { name, _id } = await req.json();
  console.log(name,_id)
  const categoryDoc = await Category.updateOne({_id},{name})
  console.log(categoryDoc)
  return Response.json(categoryDoc);
}
