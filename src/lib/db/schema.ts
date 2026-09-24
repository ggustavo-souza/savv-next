import { mysqlTable, serial, varchar, timestamp, mysqlEnum } from 'drizzle-orm/mysql-core';

export const usuarios = mysqlTable('usuarios', {
    idUsuario: serial('id').primaryKey(),
    nome: varchar('nome', { length: 50 }).notNull(),
    email: varchar('email', { length: 256 }).notNull().unique(),
    senha: varchar('senha', { length: 16 }).notNull(),
});

export const funcionario = mysqlTable('funcionarios', {
    idUsuario: serial('id').primaryKey(),
    nome: varchar('nome', { length: 50 }).notNull(),
    email: varchar('email', { length: 256 }).notNull().unique(),
    senha: varchar('senha', { length: 16 }).notNull(),
    cargo: mysqlEnum('cargo', ["diretor", "gerente", "fiscal"]).notNull(),
})

export const servicos = mysqlTable('servicos', {
    protocolo: serial('protocolo').primaryKey(),
    data: timestamp('data'),
    observacao: varchar('observacao', { length: 256 }).notNull(),
    endereco: varchar('endereco', { length: 60 }).notNull(),
    coordenadas: varchar('coordenadas', { length: 12 }).notNull(),
    imagem: varchar('imagem', { length: 60 }).notNull(),
    status: mysqlEnum('status', ["pendente", "em_analise", "concluida", "cancelada"]).notNull().default('pendente'),
    idUsuario: serial("idUsuario").references(() => usuarios.idUsuario)
})