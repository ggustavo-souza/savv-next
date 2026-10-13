import { db } from ".";
import { funcionario } from "./schema";
import { type Funcionario } from "@/types/Funcionario";

const funcionariosCheck: Funcionario[] = await db.select().from(funcionario);
async function seedFuncionario() {
    if (funcionariosCheck.length === 0) {
        await db.insert(funcionario).values(
            {
                nome: "GustavoSouza",
                email: "gustavo.oliveirapr06@gmail.com",
                senha: "$2b$10$fSRMXki.QAX0XKw53ab/Le5CRiXd9ZxM.u5cjnyHFgUjwstO7Cq4u",
                cargo: "diretor"
            })
    return;
    } else {
        console.log("Sem seeding necessário, pois já existem funcionários cadastrados.");
    }
}

seedFuncionario().then(() => {
    console.log("Seeding de funcionários concluído.");
    process.exit(0);
}).catch((error) => {
    console.error("Erro ao realizar o seeding de funcionários:", error);
    process.exit(1);
});

