import { NestFactory } from "@nestjs/core";
import { VersioningType, ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableVersioning({
		type: VersioningType.URI,
	});

	app.useGlobalPipes(
		new ValidationPipe({
			skipMissingProperties: true,
		})
	);

	const config = new DocumentBuilder()
		.setTitle("Clients Service")
		.setDescription("The clients API.")
		.setVersion("1.0")
		.addBearerAuth()
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("swagger", app, document);

	await app.listen(3000);
}
bootstrap();
