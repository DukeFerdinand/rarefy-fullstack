import type { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '$env/static/private'

// TODO: make these reliant on sessions stored in the database
export const createJwt = (user: Omit<User, 'password'>): string => {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username,
        joined: user.joined
    }, JWT_SECRET, {
        expiresIn: '30d'
    })
}

export const verifyJwt = (token: string): User => {
    return jwt.verify(token, JWT_SECRET) as User
}