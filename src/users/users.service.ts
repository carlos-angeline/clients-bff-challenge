import { Injectable, Inject } from "@nestjs/common";
import { Model } from "mongoose";
//import { User } from "../interfaces/user.interface";
type User = any;

@Injectable()
export class UsersService {
	constructor(
		@Inject("USER_MODEL")
		private userModel: Model<User>
	) {}

	private readonly users = [
		{
			userId: 1,
			username: "admin",
			password: "password",
			name: "Rafael",
			email: "xiaothemes@gmail.com",
		},
	];

	async findOne(username: string): Promise<User | undefined> {
		return this.users.find((user) => user.username === username);
	}
}
