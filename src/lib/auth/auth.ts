import bcrypt from "bcryptjs"
import { SignJWT } from 'jose'
import { cookies } from "next/headers"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

export async function hashSenha(senha: string): Promise<string> {
    return await bcrypt.hash(senha, 10)
}

export async function verificarSenha(senha: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(senha, hash);
}

export async function criarCookieSessao(userId: number) {
    const token = await new SignJWT({ userId }).setProtectedHeader({alg: "HS256"}).setExpirationTime('1d').sign(JWT_SECRET)

    const guardarCookie = await cookies();

    guardarCookie.set('session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: "/",
        maxAge: 60 * 60 * 24
    })
}