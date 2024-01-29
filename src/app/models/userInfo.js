import { Schema, model, models } from "mongoose";


const UserInfoSchema = new Schema({
    email: { type: String, required: true },
    phone: { String },
    streatAdress: { String },
    postalCode: { String },
    city: { String },
    country: { String },
    admin: { type: Boolean, default: false },
},{timestamps:true})

export const UserInfo = models?.UserInfo || model("UserInfo", UserInfoSchema);