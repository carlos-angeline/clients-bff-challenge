import { Injectable, Inject } from "@nestjs/common";
import { Model } from "mongoose";
import { hashPassword } from "../auth/helpers";
import { CreateUserDto, UpdateUserDto } from "../dtos/users.dto";
import { User } from "../interfaces/user.interface";

@Injectable()
export class UsersService {
	constructor(
		@Inject("USER_MODEL")
		private userModel: Model<User>
	) {}

	async create(createUser: CreateUserDto): Promise<User> {
		createUser.password = await hashPassword(createUser.password);

		const createdUser = new this.userModel(createUser);
		return createdUser.save();
	}

	async listAll(): Promise<User[]> {
		const users = await this.userModel.find({});

		return users;
	}

	async findOneByUsername(username: string): Promise<User> {
		const user = await this.userModel.findOne({ username: username });

		return user;
	}

	async patch(id: string, updateUser: UpdateUserDto): Promise<User> {
		const { email, name, username, password } = updateUser;
		const updatedFields: UpdateUserDto = {
			...(email && { email }),
			...(name && { name }),
			...(username && { username }),
		};

		if (password) {
			updatedFields.password = await hashPassword(password);
		}

		await this.userModel.findByIdAndUpdate(id, updatedFields);

		const user = await this.userModel.findOne({ _id: id });

		return user;
	}

	async delete(id: string): Promise<boolean> {
		const deleted = await this.userModel.deleteOne({ _id: id });

		return deleted.deletedCount > 0;
	}
}
