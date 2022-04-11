import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateProductDto {
	@IsNotEmpty()
	name: string;

	@IsNotEmpty()
	sku: string;

	@IsNotEmpty()
	category: string;
}

export class UpdateProductDto {
	name?: string;

	sku?: string;

	category?: string;
}

export class ProductResponseDto {
	name: string;
	sku: string;
	category: string;
}
