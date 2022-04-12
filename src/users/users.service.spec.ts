import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { usersProviders } from "./users.providers";
import { DatabaseModule } from "../database/database.module";
import { UsersController } from "./users.controller";

describe("UsersService", () => {
	let service: UsersService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [DatabaseModule],
			controllers: [UsersController],
			providers: [UsersService, ...usersProviders],
			exports: [UsersService],
		}).compile();

		service = module.get<UsersService>(UsersService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
