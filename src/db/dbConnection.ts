import { PrismaClient } from '@prisma/client';

let prismaClient: PrismaClient;

// Try to reuse connections where possible until performance becomes an issue
export const dbConnection = () => {
	if (!prismaClient) {
		prismaClient = new PrismaClient();
	}

	return prismaClient;
};
