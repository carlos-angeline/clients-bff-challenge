import {
	Controller,
	Get,
	Post,
	Param,
	Patch,
	Delete,
	Body,
	HttpException,
	UseGuards,
} from "@nestjs/common";
import {
	CreateProductDto,
	UpdateProductDto,
	ProductResponseDto,
} from "src/dtos/products.dto";
import { Product } from "src/interfaces/product.interface";
import { ProductsService } from "./products.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller({
	path: "products",
	version: "1",
})
export class ProductsController {
	constructor(private productsService: ProductsService) {}

	@UseGuards(JwtAuthGuard)
	@Get()
	async findAll(): Promise<ProductResponseDto[]> {
		const products: Product[] = await this.productsService.listAll();

		return products;
	}

	@UseGuards(JwtAuthGuard)
	@Get(":sku")
	async findOne(@Param() params): Promise<ProductResponseDto> {
		const sku = params.sku ?? false;
		if (!sku) {
			throw new HttpException("SKU not provided.", 400);
		}

		const product = await this.productsService.findOneBySKU(sku);

		if (!product) {
			throw new HttpException("Product not found.", 400);
		}

		return product;
	}

	@UseGuards(JwtAuthGuard)
	@Post()
	async create(
		@Body() createProduct: CreateProductDto
	): Promise<ProductResponseDto> {
		const product = await this.productsService.create(createProduct);

		return product;
	}

	@UseGuards(JwtAuthGuard)
	@Patch(":id")
	async patchOne(
		@Param() params,
		@Body() updateUser: UpdateProductDto
	): Promise<UpdateProductDto> {
		if (params.id == "id") {
			throw new HttpException("No record found with Id.", 500);
		}

		const patchedProduct = await this.productsService.patch(
			params.id,
			updateUser
		);

		return patchedProduct;
	}

	@UseGuards(JwtAuthGuard)
	@Delete(":id")
	async deleteOne(@Param() params): Promise<Object> {
		if (params.id == "id") {
			throw new HttpException("No record found with Id.", 500);
		}

		const isDeleted = await this.productsService.delete(params.id);

		if (!isDeleted) {
			throw new HttpException("Product can not be deleted.", 500);
		}

		return {
			message: "Product deleted with sucess.",
		};
	}
}
