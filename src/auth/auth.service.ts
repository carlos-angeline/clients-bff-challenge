import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { comparePassword } from "./helpers";

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}

	async validateUser(username: string, pass: string): Promise<any> {
		const user = await this.usersService.findOneByUsername(username);
		if (user && (await comparePassword(pass, user.password))) {
			return {
				id: user._id,
				username: user.username,
				email: user.email,
			};
		}
		return null;
	}

	async login(user: any) {
		const payload = { username: user.username, sub: user.userId };
		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
