import { dbConnection } from '$db/dbConnection';
import type { LoadFunc } from "./$types";

export const load: LoadFunc = async function ({ locals }) {
    console.log(locals.user)
    
    const prisma = dbConnection();

    const savedSearches = await prisma.savedSearch.findMany({
        where: {
            userId: locals.user.id
        }
    })
    
    return {
        savedSearches
    }
}