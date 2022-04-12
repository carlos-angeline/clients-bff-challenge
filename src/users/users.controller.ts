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
import { ApiTags } from "@nestjs/swagger";
import {
	CreateUserDto,
	UpdateUserDto,
	UserResponseDto,
} from "../dtos/users.dto";
import { User } from "../interfaces/user.interface";
import { UsersService } from "./users.service";

@ApiTags("users")
@Controller({
	path: "users",
	version: "1",
})
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Get()
	async findAll(): Promise<UserResponseDto[]> {
		const users: User[] = await this.usersService.listAll();

		const resUsers = users.map((u) => {
			const { password, ...res } = u.toObject();
			return res;
		});

		return resUsers;
	}

	@Get(":username")
	async findOne(@Param("username") username: string): Promise<UserResponseDto> {
		if (!username) {
			throw new HttpException("Username not provided.", 400);
		}

		const user = await this.usersService.findOneByUsername(username);

		if (!user) {
			throw new HttpException("Username not found.", 400);
		}

		// Remove password from returned obj.
		const { password, ...resUser } = user.toObject();

		return resUser;
	}

	@Post()
	async create(@Body() createUser: CreateUserDto): Promise<UserResponseDto> {
		const user = await this.usersService.create(createUser);
		const { password, ...resUser } = user.toObject();

		return resUser;
	}

	@Patch(":id")
	async patchOne(
		@Param("id") id: string,
		@Body() updateUser: UpdateUserDto
	): Promise<UpdateUserDto> {
		if (id == "id") {
			throw new HttpException("No record found with Id.", 500);
		}

		const patchedUser = await this.usersService.patch(id, updateUser);

		// Remove password from returned obj.
		const { password, ...resUser } = patchedUser.toObject();

		return resUser;
	}

	@Delete(":id")
	async deleteOne(@Param("id") id: string): Promise<Object> {
		if (id == "id") {
			throw new HttpException("No record found with Id.", 500);
		}

		const isDeleted = await this.usersService.delete(id);

		if (!isDeleted) {
			throw new HttpException("User can not be deleted.", 500);
		}

		return {
			message: "User deleted with sucess.",
		};
	}
}
