import * as mongoose from "mongoose";

export const databaseProviders = [
	{
		provide: "DATABASE_CONNECTION",
		useFactory: (): Promise<typeof mongoose> =>
			mongoose.connect(
				process.env.MONGO_AUTH_URL ??
					"mongodb://root:password@0.0.0.0:27017/dev?directConnection=true&ssl=false&authSource=admin"
			),
	},
];
