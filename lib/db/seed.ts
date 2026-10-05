// import { db } from ".";
// import type { ServicoBD } from "@/types/Servico";
// import * as schema from "./schema";

// const teste = await db.select().from(schema.usuarios);

// if (teste.length === 0) {

//     const seedServicos: ServicoBD[] = [
//         { observacao: "bla bla bla", endereco: "Rua do sim, 10 18190-000 Centro", lat: -23.1230, lng: -50.1902, imagem: 'imagem.png', status: "pendente", tipoServico: "poda", idUsuario: 1 },
//         { observacao: "bla bla bla", endereco: "Rua do sim, 10 18190-000 Centro", lat: -23.1230, lng: -50.1902, imagem: 'imagem.png', status: "em_analise", tipoServico: "plantio", idUsuario: 1 },
//         { observacao: "bla bla bla", endereco: "Rua do sim, 10 18190-000 Centro", lat: -23.1230, lng: -50.1902, imagem: 'imagem.png', status: "pendente", tipoServico: "erradicacao", idUsuario: 1 }
//     ]

//     try {

//         console.log("Inserindo servicos a partir do seeding")
//         await db.insert(schema.servicos).values(seedServicos)
//         console.log("Os servicos foram adicionados com sucesso.")

//     } catch (e) {
//         if (e instanceof Error)
//             console.log("Ocorreu um erro ao tentar inserir algum dos dados no banco de dados:" + e.message)
//     } finally {
//         process.exit(0);
//     }
// } else {
//     console.log("O seed não será feito pois ja existem registros no banco de dados.")
// }
