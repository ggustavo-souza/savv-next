'use server'

import { removerCookieSessao } from "@/lib/auth/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function logoutAction() {
    await removerCookieSessao();
    revalidatePath('/', 'layout');
    redirect('/');
}
