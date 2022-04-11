import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
	@IsNotEmpty()
	name: string;

	@IsNotEmpty()
	username: string;

	@IsEmail()
	email: string;

	@IsNotEmpty()
	password: string;
}

export class UpdateUserDto {
	name?: string;

	username?: string;

	@IsEmail()
	email?: string;

	password?: string;
}

export class UserResponseDto {
	name: string;
	username: string;
	email: string;
}
