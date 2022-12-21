import type { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '$env/static/private'

export const createJwt = (user: Omit<User, 'password' | 'joined'>): string => {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, JWT_SECRET, {
        expiresIn: '30d'
    })
}