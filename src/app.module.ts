import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { ProductsController } from "./products/products.controller";
import { ProductsService } from "./products/products.service";
import { ProductsModule } from "./products/products.module";

@Module({
	imports: [ConfigModule.forRoot(), AuthModule, UsersModule, ProductsModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
