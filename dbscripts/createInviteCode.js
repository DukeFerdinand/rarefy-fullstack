import {PrismaClient} from "@prisma/client";

async function main() {
    const prisma = new PrismaClient();
    const inviteCode = await prisma.inviteCode.create({
        data: {} // all fields are initialized with default values
    })
    console.log(`Created invite code: ${inviteCode.code}`);
}

main().then(() => {
    process.exit(0);
}).catch(e => {
    console.error(e);
    process.exit(1);
})