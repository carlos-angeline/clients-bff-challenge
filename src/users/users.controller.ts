import {
	Controller,
	Get,
	Post,
	Param,
	Patch,
	Delete,
	Body,
} from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "src/dtos/users.dto";

@Controller({
	path: "users",
	version: "1",
})
export class UsersController {
	@Get()
	findAll(): string {
		return "This action returns all cats";
	}

	@Get(":id")
	findOne(@Param() params): string {
		console.log(params.id);
		return `This action returns a #${params.id} cat`;
	}

	@Post()
	create(@Body() createUser: CreateUserDto): CreateUserDto {
		return createUser;
	}

	@Patch(":id")
	patchOne(@Param() params, @Body() updateUser: UpdateUserDto): UpdateUserDto {
		console.log(params.id);
		return updateUser;
	}

	@Delete(":id")
	deleteOne(@Param() params): string {
		console.log(params.id);
		return `This action returns a #${params.id} cat`;
	}
}
