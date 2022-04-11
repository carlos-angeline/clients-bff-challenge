import * as mongoose from "mongoose";

export const ProductSchema = new mongoose.Schema(
	{
		name: String,
		sku: String,
		category: String,
	},
	{ versionKey: false }
);
