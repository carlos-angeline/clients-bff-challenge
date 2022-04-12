import { Test, TestingModule } from "@nestjs/testing";
import { ProductsService } from "./products.service";
import { usersProviders } from "./products.providers";
import { DatabaseModule } from "../database/database.module";

describe("ProductsService", () => {
	let service: ProductsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [DatabaseModule],
			providers: [ProductsService, ...usersProviders],
		}).compile();

		service = module.get<ProductsService>(ProductsService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
