import { Funcionario } from "@/src/types/Funcionario";
import { db } from ".";
import type { Usuario } from "@/src/types/Usuario";
import type { ServicoBD } from "@/src/types/Servico";
import * as schema from "./schema";

const teste = await db.select().from(schema.usuarios);

if (teste.length === 0) {

    const seedUsers: Usuario[] = [
        { idUsuario: 1, nome: "gustavo1", email: "gustavo@email.com", senha: "123" },
        { idUsuario: 2, nome: "gustavo2", email: "gustavo2@email.com", senha: "123" },
        { idUsuario: 3, nome: "gustavo3", email: "gustavo3@email.com", senha: "123" }
    ]

    const seedFuncionarios: Funcionario[] = [
        { idFuncionario: 1, nome: "gustavo1", email: "gustavo@email.com", senha: "123", cargo: "diretor" },
        { idFuncionario: 2, nome: "gustavo2", email: "gustavo2@email.com", senha: "123", cargo: "gerente" },
        { idFuncionario: 3, nome: "gustavo3", email: "gustavo3@email.com", senha: "123", cargo: "fiscal" }
    ]

    const seedServicos: ServicoBD[] = [
        { protocolo: 1, observacao: "bla bla bla", endereco: "Rua do sim, 10 18190-000 Centro", lat: -23.1230, lng: -50.1902, imagem: 'imagem.png', status: "pendente", tipoServico: "poda", idUsuario: 1 },
        { protocolo: 2, observacao: "bla bla bla", endereco: "Rua do sim, 10 18190-000 Centro", lat: -23.1230, lng: -50.1902, imagem: 'imagem.png', status: "em_analise", tipoServico: "plantio", idUsuario: 1 },
        { protocolo: 3, observacao: "bla bla bla", endereco: "Rua do sim, 10 18190-000 Centro", lat: -23.1230, lng: -50.1902, imagem: 'imagem.png', status: "pendente", tipoServico: "erradicacao", idUsuario: 1 }
    ]

    try {
        console.log("Inserindo usuários a partir do seeding")
        await db.insert(schema.usuarios).values(seedUsers)
        console.log("Os usuários foram adicionados com sucesso.")

        console.log("Inserindo Funcionários a partir do seeding")
        await db.insert(schema.funcionario).values(seedFuncionarios)
        console.log("Os funcionarios foram adicionados com sucesso.")

        console.log("Inserindo servicos a partir do seeding")
        await db.insert(schema.servicos).values(seedServicos)
        console.log("Os servicos foram adicionados com sucesso.")

    } catch (e) {
        if (e instanceof Error)
            console.log("Ocorreu um erro ao tentar inserir algum dos dados no banco de dados:" + e.message)
    } finally {
        process.exit(0);
    }
} else {
    console.log("O seed não será feito pois ja existem registros no banco de dados.")
}
