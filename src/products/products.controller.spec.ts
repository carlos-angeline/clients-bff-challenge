import { Test, TestingModule } from "@nestjs/testing";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { usersProviders } from "./products.providers";
import { DatabaseModule } from "../database/database.module";

describe("ProductsController", () => {
	let controller: ProductsController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ProductsController],
			imports: [DatabaseModule],
			providers: [ProductsService, ...usersProviders],
		}).compile();

		controller = module.get<ProductsController>(ProductsController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
