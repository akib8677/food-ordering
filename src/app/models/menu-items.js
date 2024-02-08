import mongoose, { Schema, model, models } from "mongoose";

const ExtraPricesSchema = new Schema({
  name: String,
  price: Number,
});

const MenuItemsSchema = new Schema(
  {
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    basePrice: { type: String, required: true },
    category: { type: mongoose.Types.ObjectId },
    sizes: { type: [ExtraPricesSchema] },
    extraIngredientPrices: { type: [ExtraPricesSchema] },
  },
  { timestamps: true }
);

export const MenuItems = models?.MenuItems || model("MenuItems", MenuItemsSchema);
