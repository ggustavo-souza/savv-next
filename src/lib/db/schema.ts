import { mysqlTable, varchar, timestamp, mysqlEnum, int, double } from 'drizzle-orm/mysql-core';

export const usuarios = mysqlTable('usuarios', {
    idUsuario: int('idUsuario').primaryKey().autoincrement(),
    nome: varchar('nome', { length: 50 }).notNull(),
    email: varchar('email', { length: 150 }).notNull().unique(),
    senha: varchar('senha', { length: 256 }).notNull(),
});

export const funcionario = mysqlTable('funcionarios', {
    idFuncionario: int('idFuncionario').primaryKey().autoincrement(),
    nome: varchar('nome', { length: 50 }).notNull(),
    email: varchar('email', { length: 150 }).notNull().unique(),
    senha: varchar('senha', { length: 256 }).notNull(),
    cargo: mysqlEnum('cargo', ["diretor", "gerente", "fiscal"]).notNull(),
})

export const servicos = mysqlTable('servicos', {
    protocolo: int('protocolo').primaryKey().autoincrement(),
    data: timestamp('data'),
    observacao: varchar('observacao', { length: 256 }).notNull(),
    endereco: varchar('endereco', { length: 200 }).notNull(),
    lat: double('lat').notNull(),
    lng: double('lng').notNull(),
    imagem: varchar('imagem', { length: 256 }).notNull(),
    status: mysqlEnum('status', ["pendente", "em_analise", "concluida", "cancelada"]).notNull().default('pendente'),
    categoria: mysqlEnum('categoria', ["poda", "plantio", "erradicacao", "rocagem"]).notNull(),
    idUsuario: int("idUsuario").references(() => usuarios.idUsuario)
})