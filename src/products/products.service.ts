import { Injectable, Inject } from "@nestjs/common";
import { Model } from "mongoose";
import { CreateProductDto, UpdateProductDto } from "src/dtos/products.dto";
import { Product } from "../interfaces/product.interface";

@Injectable()
export class ProductsService {
	constructor(
		@Inject("PRODUCT_MODEL")
		private productModel: Model<Product>
	) {}

	async create(createProduct: CreateProductDto): Promise<Product> {
		const createdProduct = new this.productModel(createProduct);
		return createdProduct.save();
	}

	async listAll(): Promise<Product[]> {
		const products = await this.productModel.find({});

		return products;
	}

	async findOneBySKU(sku: string): Promise<Product> {
		const user = await this.productModel.findOne({ sku: sku });

		return user;
	}

	async patch(id: string, updateProduct: UpdateProductDto): Promise<Product> {
		const { name, sku, category } = updateProduct;
		const updatedFields: UpdateProductDto = {
			...(name && { name }),
			...(sku && { sku }),
			...(category && { category }),
		};

		await this.productModel.findByIdAndUpdate(id, updatedFields);

		const product = await this.productModel.findOne({ _id: id });

		return product;
	}

	async delete(id: string): Promise<boolean> {
		const deleted = await this.productModel.deleteOne({ _id: id });

		return deleted.deletedCount > 0;
	}
}
