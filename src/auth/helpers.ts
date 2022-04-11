import * as bcrypt from "bcrypt";
const SALT_WORK_FACTOR = 10;

export const hashPassword = async (password: string): Promise<string> => {
	const hashedPassword: string = await new Promise((resolve, reject) => {
		bcrypt.hash(password, SALT_WORK_FACTOR, function (err, hash) {
			if (err) reject(err);
			resolve(hash);
		});
	});

	return hashedPassword;
};

export const comparePassword = async (
	candidatePassword: string,
	hashedPassword: string
): Promise<boolean> => {
	const isMatchPassword: boolean = await new Promise((resolve, reject) => {
		bcrypt.compare(candidatePassword, hashedPassword, function (err, isMatch) {
			if (err) return reject(err);
			resolve(isMatch);
		});
	});

	return isMatchPassword;
};
