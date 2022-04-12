import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateProductDto {
	@ApiProperty()
	@IsNotEmpty()
	name: string;

	@ApiProperty()
	@IsNotEmpty()
	sku: string;

	@ApiProperty()
	@IsNotEmpty()
	category: string;
}

export class UpdateProductDto {
	@ApiProperty()
	name?: string;

	@ApiProperty()
	sku?: string;

	@ApiProperty()
	category?: string;
}

export class ProductResponseDto {
	@ApiProperty()
	name: string;

	@ApiProperty()
	sku: string;

	@ApiProperty()
	category: string;
}
