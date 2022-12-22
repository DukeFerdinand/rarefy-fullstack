import { PrismaClient } from '@prisma/client';

async function main() {
    // get first cli arg
    const machineName = process.argv[2];
    if (!machineName) {
        console.error('Please provide a machine name as the first argument');
        process.exit(1);
    }

    const prisma = new PrismaClient();
    const machineUser = await prisma.machineUser.create({
        data: {
            commonName: machineName,
            allowedIps: ['*']
        }
    });

    // create access token
    const accessToken = await prisma.accessToken.create({
        data: {
            machineUserId: machineUser.id,
        }
    });

    console.log(`Created machine user: ${machineUser.id}, ${machineUser.commonName}`);
    console.log(`Created access token: ${accessToken.token} for machine user: ${machineUser.commonName}`);
}

main().then(() => {
    process.exit(0);
})
.catch((e) => {
    console.error(e);
    process.exit(1);
});
