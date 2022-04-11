import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { usersProviders } from "./products.providers";
import { DatabaseModule } from "../database/database.module";
import { ProductsController } from "./products.controller";

@Module({
	imports: [DatabaseModule],
	controllers: [ProductsController],
	providers: [ProductsService, ...usersProviders],
	exports: [ProductsService],
})
export class ProductsModule {}
