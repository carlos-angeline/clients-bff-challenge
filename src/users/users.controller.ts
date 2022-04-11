import {
	Controller,
	Get,
	Post,
	Param,
	Patch,
	Delete,
	Body,
	HttpException,
} from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "src/dtos/users.dto";
import { User } from "src/interfaces/user.interface";
import { UsersService } from "./users.service";

@Controller({
	path: "users",
	version: "1",
})
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Get()
	async findAll(): Promise<User[]> {
		return await this.usersService.listAll();
	}

	@Get(":username")
	async findOne(@Param() params): Promise<User> {
		const username = params.username ?? false;
		if (!username) {
			throw new HttpException("Username not provided.", 400);
		}

		const user = await this.usersService.findOneByUsername(username);

		if (!user) {
			throw new HttpException("Username not found.", 400);
		}

		return user;
	}

	@Post()
	async create(@Body() createUser: CreateUserDto): Promise<User> {
		const user = await this.usersService.create(createUser);
		return user;
	}

	@Patch(":id")
	async patchOne(
		@Param() params,
		@Body() updateUser: UpdateUserDto
	): Promise<UpdateUserDto> {
		if (params.id == "id") {
			throw new HttpException("No record found with Id.", 500);
		}

		const patchedUser = await this.usersService.patch(params.id, updateUser);

		return patchedUser;
	}

	@Delete(":id")
	async deleteOne(@Param() params): Promise<Object> {
		if (params.id == "id") {
			throw new HttpException("No record found with Id.", 500);
		}

		const isDeleted = await this.usersService.delete(params.id);

		if (!isDeleted) {
			throw new HttpException("User can not be deleted.", 500);
		}

		return {
			message: "User deleted with sucess.",
		};
	}
}
