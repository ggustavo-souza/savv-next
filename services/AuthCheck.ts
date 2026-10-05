import { cookies } from 'next/headers'
import { jwtVerify } from 'jose';
import { db } from '../lib/db';
import { usuarios } from '../lib/db/schema';
import { eq } from 'drizzle-orm';

// faz uma consulta no banco de dados e devolve o usuário completo
export async function checarAutenticacao() {
    const cookiesSessao = await cookies();
    const token = cookiesSessao.get('session')?.value

    const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

    if (!token)
        return false

    try {
        const { payload } = await jwtVerify(token, JWT_SECRET)
        const userId = payload.userId as number
        const cargo = payload.cargo as string | null

        const [user] = await db.select().from(usuarios).where(eq(usuarios.idUsuario, userId)).limit(1)

        if (!user)
            return false

        return { user, cargo }
    } catch (e) {
        if (e instanceof Error) {
            console.log("Ocorreu um erro ao checar autenticação: " + e.message)
            return false
        }
    }
}

// apenas verifica o token e devolver o userId junto do cargo do usuário se tiver
export async function obterSessao() {
    const cookiesSessao = await cookies();
    const token = cookiesSessao.get('session')?.value;

    const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

    if (!token) return null;

    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);

        if (!payload.userId) {
            return null;
        };

        if(payload.exp && Date.now() >= payload.exp * 1000) {
            cookiesSessao.delete('session');
            return null;
        }

        const [user] = await db.select().from(usuarios).where(eq(usuarios.idUsuario, payload.userId as number)).limit(1)

        if(!user){
            cookiesSessao.delete('session');
            return null;
        }


        return {
            userId: payload.userId as number,
            cargo: payload.cargo as string | null,
        };
    } catch {
        return null;
    }
}