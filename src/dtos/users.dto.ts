import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
	@ApiProperty()
	@IsNotEmpty()
	name: string;

	@ApiProperty()
	@IsNotEmpty()
	username: string;

	@ApiProperty()
	@IsEmail()
	email: string;

	@ApiProperty()
	@IsNotEmpty()
	password: string;
}

export class UpdateUserDto {
	@ApiProperty()
	name?: string;

	@ApiProperty()
	username?: string;

	@ApiProperty()
	@IsEmail()
	email?: string;

	@ApiProperty()
	password?: string;
}

export class UserResponseDto {
	@ApiProperty()
	name: string;

	@ApiProperty()
	username: string;

	@ApiProperty()
	email: string;
}
