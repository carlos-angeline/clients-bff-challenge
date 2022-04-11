import * as mongoose from "mongoose";

const SALT_WORK_FACTOR = 10;

export const UserSchema = new mongoose.Schema(
	{
		name: String,
		username: String,
		password: String,
		email: String,
	},
	{ versionKey: false }
);
