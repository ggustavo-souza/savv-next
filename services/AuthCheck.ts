import { cookies } from 'next/headers'
import { jwtVerify } from 'jose';
import { db } from '../lib/db';
import { usuarios, funcionario } from '../lib/db/schema';
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

        // Funcionários são armazenados em tabela diferente
        if (cargo) {
            const [func] = await db.select().from(funcionario).where(eq(funcionario.idFuncionario, userId)).limit(1)

            if (!func)
                return false

            return { user: func, cargo }
        }

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

        const userId = payload.userId as number;
        const cargo = payload.cargo as string | null;

        // Funcionários são armazenados em tabela diferente
        if (cargo) {
            const [func] = await db.select().from(funcionario).where(eq(funcionario.idFuncionario, userId)).limit(1)

            if (!func) {
                cookiesSessao.delete('session');
                return null;
            }

            return { userId, cargo };
        }

        const [user] = await db.select().from(usuarios).where(eq(usuarios.idUsuario, userId)).limit(1)

        if(!user){
            cookiesSessao.delete('session');
            return null;
        }

        return {
            userId,
            cargo,
        };
    } catch {
        return null;
    }
}