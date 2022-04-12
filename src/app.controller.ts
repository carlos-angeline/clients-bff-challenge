import {
	Controller,
	Get,
	Request,
	Body,
	Post,
	UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { AuthService } from "./auth/auth.service";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "./dtos/auth.dto";

@ApiTags("auth")
@Controller({
	version: "1",
})
export class AppController {
	constructor(private authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@ApiBody({ type: LoginDto })
	@Post("auth/login")
	async login(@Request() req: LoginDto) {
		return this.authService.login(req.user);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Get("profile")
	getProfile(@Request() req) {
		return req.user;
	}
}
