import { dbConnection } from '$db/dbConnection';

export async function checkMachineUserToken(token: string) {
	const prisma = dbConnection();
	return prisma.accessToken.findUnique({
		where: {
			token: token.replace('Bearer ', '')
		},
		include: {
			machineUser: true
		}
	});
}
