import { dbConnection } from '$db/dbConnection';
import type { LoadFunc } from "./$types";
import {verifyJwt} from "../../lib/server/jwt";
import {redirect} from "@sveltejs/kit";


export const load: LoadFunc = async function ({ locals , cookies}) {
    const token = cookies.get('rarefy_token');
    const userId = verifyJwt(token || '').id;
    
    const prisma = dbConnection();

    const data = await prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
            SavedSearch: true
        }
    })

    if (!data) {
        throw redirect(302, '/login');
    }

    locals.user = {
        id: data.id,
        username: data.username,
        email: data.email,
        joined: data.joined,
    }

    console.log(data)
    return data
}