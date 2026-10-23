import { Usuario } from "@/types/Usuario";
import { db } from ".";
import { funcionario, servicos, usuarios } from "./schema";
import { type Funcionario } from "@/types/Funcionario";

async function seedFuncionario() {
    const funcionariosCheck: Funcionario[] = await db.select().from(funcionario);
    if (funcionariosCheck.length === 0) {
        await db.insert(funcionario).values([{
            nome: "GustavoSouza",
            email: "gustavo.oliveirapr06@gmail.com",
            senha: "$2b$10$fSRMXki.QAX0XKw53ab/Le5CRiXd9ZxM.u5cjnyHFgUjwstO7Cq4u",
            cargo: "diretor"
        },
        {
            nome: "Eng. Gustavo",
            email: "gustavo@email.com",
            senha: "$2b$10$fSRMXki.QAX0XKw53ab/Le5CRiXd9ZxM.u5cjnyHFgUjwstO7Cq4u",
            cargo: "fiscal"
        }
        ]);
        console.log("Seeding de funcionários concluído.");
    } else {
        console.log("Sem seeding de funcionários necessário (já existem registros).");
    }
}

async function seedUsuario() {
    const usuariosCheck: Usuario[] = await db.select().from(usuarios);
    if (usuariosCheck.length === 0) {
        await db.insert(usuarios).values([{
            nome: "GustavoSouza",
            email: "gustavo.oliveirapr06@gmail.com",
            senha: "$2b$10$fSRMXki.QAX0XKw53ab/Le5CRiXd9ZxM.u5cjnyHFgUjwstO7Cq4u",
        },
        {
            nome: "Eng. Gustavo",
            email: "gustavo@email.com",
            senha: "$2b$10$fSRMXki.QAX0XKw53ab/Le5CRiXd9ZxM.u5cjnyHFgUjwstO7Cq4u",
        }
        ]);
        console.log("Seeding de usuários concluído.");
    } else {
        console.log("Sem seeding de usuários necessário (já existem registros).");
    }
}

async function seedServicos() {
    const servicosCheck = await db.select().from(servicos).limit(1);
    if (servicosCheck.length === 0) {
        await db.insert(servicos).values([
            {
                data: new Date("2026-02-01T11:54:28Z"),
                observacao: "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
                endereco: "737 Clove Place",
                lat: -23.583149,
                lng: -47.463277,
                imagem: "Sem_imagem.jpg",
                status: "em_analise",
                categoria: "rocagem",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-01-09T03:42:07Z"),
                observacao: "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
                endereco: "3 Gerald Trail",
                lat: -23.58568,
                lng: -47.453989,
                imagem: "Sem_imagem.jpg",
                status: "em_analise",
                categoria: "poda",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-06-03T21:09:20Z"),
                observacao: "Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros.",
                endereco: "6 Packers Terrace",
                lat: -23.591265,
                lng: -47.482808,
                imagem: "Sem_imagem.jpg",
                status: "em_analise",
                categoria: "erradicacao",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-01-24T21:25:01Z"),
                observacao: "Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia.",
                endereco: "2 Moland Plaza",
                lat: -23.562249,
                lng: -47.454698,
                imagem: "Sem_imagem.jpg",
                status: "em_analise",
                categoria: "erradicacao",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-08-03T16:04:29Z"),
                observacao: "Nulla mollis molestie lorem.",
                endereco: "31 Sycamore Court",
                lat: -23.576709,
                lng: -47.478526,
                imagem: "Sem_imagem.jpg",
                status: "cancelada",
                categoria: "erradicacao",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-03-21T09:28:36Z"),
                observacao: "Curabitur gravida nisi at nibh.",
                endereco: "2846 Menomonie Lane",
                lat: -23.557504,
                lng: -47.474436,
                imagem: "Sem_imagem.jpg",
                status: "em_analise",
                categoria: "rocagem",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-03-29T11:11:48Z"),
                observacao: "Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.",
                endereco: "501 Pawling Trail",
                lat: -23.574473,
                lng: -47.422924,
                imagem: "Sem_imagem.jpg",
                status: "em_analise",
                categoria: "poda",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-09-04T20:27:00Z"),
                observacao: "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
                endereco: "409 Norway Maple Plaza",
                lat: -23.599862,
                lng: -47.460085,
                imagem: "Sem_imagem.jpg",
                status: "pendente",
                categoria: "rocagem",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-07-27T06:29:07Z"),
                observacao: "Integer tincidunt ante vel ipsum.",
                endereco: "069 Transport Drive",
                lat: -23.573193,
                lng: -47.426781,
                imagem: "Sem_imagem.jpg",
                status: "cancelada",
                categoria: "rocagem",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-06-08T22:07:13Z"),
                observacao: "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
                endereco: "81901 Myrtle Way",
                lat: -23.585639,
                lng: -47.440723,
                imagem: "Sem_imagem.jpg",
                status: "em_analise",
                categoria: "rocagem",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-10-02T20:04:26Z"),
                observacao: "Nulla ut erat id mauris vulputate elementum. Nullam varius.",
                endereco: "2 Everett Center",
                lat: -23.544844,
                lng: -47.432919,
                imagem: "Sem_imagem.jpg",
                status: "pendente",
                categoria: "poda",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-03-25T13:28:49Z"),
                observacao: "In sagittis dui vel nisl. Duis ac nibh.",
                endereco: "7010 Sugar Drive",
                lat: -23.571915,
                lng: -47.421422,
                imagem: "Sem_imagem.jpg",
                status: "em_analise",
                categoria: "rocagem",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-07-05T13:23:37Z"),
                observacao: "Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat.",
                endereco: "6539 Loeprich Park",
                lat: -23.589447,
                lng: -47.445153,
                imagem: "Sem_imagem.jpg",
                status: "cancelada",
                categoria: "rocagem",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-05-10T04:28:28Z"),
                observacao: "Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo.",
                endereco: "23 Sachs Place",
                lat: -23.593589,
                lng: -47.450116,
                imagem: "Sem_imagem.jpg",     
                status: "em_analise",
                categoria: "rocagem",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-05-13T00:15:47Z"),
                observacao: "Aliquam erat volutpat. In congue. Etiam justo.",
                endereco: "977 Merry Alley",
                lat: -23.554643,
                lng: -47.489136,
                imagem: "Sem_imagem.jpg",
                status: "concluida",
                categoria: "rocagem",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-07-05T19:42:57Z"),
                observacao: "Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque.",
                endereco: "807 Gateway Point",
                lat: -23.587417,
                lng: -47.487273,
                imagem: "Sem_imagem.jpg",
                status: "cancelada",
                categoria: "rocagem",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-08-09T06:23:09Z"),
                observacao: "Nulla tellus. In sagittis dui vel nisl. Duis ac nibh.",
                endereco: "3 Main Point",
                lat: -23.585549,
                lng: -47.443273,
                imagem: "Sem_imagem.jpg",              
                status: "cancelada",
                categoria: "erradicacao",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-07-27T04:59:08Z"),
                observacao: "Ut tellus. Nulla ut erat id mauris vulputate elementum.",
                endereco: "7 Kropf Park",
                lat: -23.58751,
                lng: -47.447937,
                imagem: "Sem_imagem.jpg",
                status: "concluida",
                categoria: "poda",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-07-27T16:16:45Z"),
                observacao: "Vivamus vel nulla eget eros elementum pellentesque.",
                endereco: "9 Tomscot Way",
                lat: -23.538133,
                lng: -47.466812,
                imagem: "Sem_imagem.jpg",
                status: "concluida",
                categoria: "poda",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-09-13T20:24:30Z"),
                observacao: "In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices.",
                endereco: "641 Hooker Park",
                lat: -23.536093,
                lng: -47.466817,
                imagem: "Sem_imagem.jpg",
                status: "em_analise",
                categoria: "poda",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-09-17T06:30:34Z"),
                observacao: "Fusce consequat. Nulla nisl. Nunc nisl.",
                endereco: "857 Onsgard Park",
                lat: -23.555666,
                lng: -47.480652,
                imagem: "Sem_imagem.jpg",
                status: "pendente",
                categoria: "erradicacao",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-02-11T16:22:19Z"),
                observacao: "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.",
                endereco: "18068 Talmadge Alley",
                lat: -23.551262,
                lng: -47.445625,
                imagem: "Sem_imagem.jpg",
                status: "em_analise",
                categoria: "poda",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-06-04T23:48:28Z"),
                observacao: "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
                endereco: "0 Forster Circle",
                lat: -23.581605,
                lng: -47.441215,
                imagem: "Sem_imagem.jpg",
                status: "concluida",
                categoria: "poda",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-02-27T05:48:21Z"),
                observacao: "Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
                endereco: "4 Thackeray Junction",
                lat: -23.584231,
                lng: -47.475052,
                imagem: "Sem_imagem.jpg",
                status: "pendente",
                categoria: "erradicacao",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-09-22T05:03:29Z"),
                observacao: "Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia.",
                endereco: "398 Roth Terrace",
                lat: -23.535782,
                lng: -47.425925,
                imagem: "Sem_imagem.jpg",
                status: "cancelada",
                categoria: "erradicacao",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-09-20T23:39:21Z"),
                observacao: "Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla.",
                endereco: "564 Sauthoff Lane",
                lat: -23.535148,
                lng: -47.47842,
                imagem: "Sem_imagem.jpg",
                status: "cancelada",
                categoria: "poda",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-05-24T01:39:06Z"),
                observacao: "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
                endereco: "91352 Esker Point",
                lat: -23.558166,
                lng: -47.421176,
                imagem: "Sem_imagem.jpg",
                status: "concluida",
                categoria: "erradicacao",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-07-24T08:54:56Z"),
                observacao: "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.",
                endereco: "875 Erie Junction",
                lat: -23.563061,
                lng: -47.474454,
                imagem: "Sem_imagem.jpg",
                status: "cancelada",
                categoria: "poda",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-03-24T06:44:21Z"),
                observacao: "Maecenas pulvinar lobortis est.",
                endereco: "61 Michigan Circle",
                lat: -23.54232,
                lng: -47.431849,
                imagem: "Sem_imagem.jpg",
                status: "em_analise",
                categoria: "rocagem",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-06-06T14:34:58Z"),
                observacao: "In sagittis dui vel nisl. Duis ac nibh.",
                endereco: "39 Grayhawk Point",
                lat: -23.564534,
                lng: -47.436808,
                imagem: "Sem_imagem.jpg",
                status: "em_analise",
                categoria: "poda",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-08-13T05:02:20Z"),
                observacao: "Vestibulum rutrum rutrum neque.",
                endereco: "899 Dayton Lane",
                lat: -23.560563,
                lng: -47.421201,
                imagem: "Sem_imagem.jpg",
                status: "concluida",
                categoria: "poda",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-05-05T22:22:47Z"),
                observacao: "Donec semper sapien a libero. Nam dui.",
                endereco: "151 Jenna Road",
                lat: -23.59948,
                lng: -47.44313,
                imagem: "Sem_imagem.jpg",
                status: "cancelada",
                categoria: "rocagem",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-08-26T17:38:16Z"),
                observacao: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum.",
                endereco: "91060 Tomscot Hill",
                lat: -23.592359,
                lng: -47.480398,
                imagem: "Sem_imagem.jpg",
                status: "em_analise",
                categoria: "poda",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-02-13T12:21:10Z"),
                observacao: "Suspendisse potenti.",
                endereco: "099 Meadow Vale Avenue",
                lat: -23.530322,
                lng: -47.434192,
                imagem: "Sem_imagem.jpg",
                status: "em_analise",
                categoria: "poda",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-08-16T22:47:18Z"),
                observacao: "Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh.",
                endereco: "820 Killdeer Circle",
                lat: -23.581984,
                lng: -47.487788,
                imagem: "Sem_imagem.jpg",
                status: "pendente",
                categoria: "erradicacao",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-02-21T17:28:35Z"),
                observacao: "Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia.",
                endereco: "57215 Kedzie Place",
                lat: -23.586946,
                lng: -47.47932,
                imagem: "Sem_imagem.jpg",
                status: "concluida",
                categoria: "poda",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-07-26T15:09:59Z"),
                observacao: "Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus.",
                endereco: "389 Gerald Avenue",
                lat: -23.599183,
                lng: -47.465165,
                imagem: "Sem_imagem.jpg",
                status: "em_analise",
                categoria: "erradicacao",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-03-24T23:57:44Z"),
                observacao: "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
                endereco: "27 Cascade Circle",
                lat: -23.566322,
                lng: -47.488639,
                imagem: "Sem_imagem.jpg",
                status: "cancelada",
                categoria: "erradicacao",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-06-20T22:44:57Z"),
                observacao: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
                endereco: "35 East Parkway",
                lat: -23.57204,
                lng: -47.42061,
                imagem: "Sem_imagem.jpg",
                status: "pendente",
                categoria: "rocagem",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-02-12T23:30:44Z"),
                observacao: "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
                endereco: "927 Dennis Street",
                lat: -23.563793,
                lng: -47.44309,
                imagem: "Sem_imagem.jpg",
                status: "em_analise",
                categoria: "rocagem",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-05-02T09:45:48Z"),
                observacao: "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio.",
                endereco: "91 Pennsylvania Court",
                lat: -23.541032,
                lng: -47.48573,
                imagem: "Sem_imagem.jpg",
                status: "concluida",
                categoria: "erradicacao",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-08-12T20:04:27Z"),
                observacao: "Donec vitae nisi.",
                endereco: "42 Golf Junction",
                lat: -23.560915,
                lng: -47.420792,
                imagem: "Sem_imagem.jpg",
                status: "em_analise",
                categoria: "poda",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-03-27T06:37:32Z"),
                observacao: "In congue.",
                endereco: "6423 Pine View Parkway",
                lat: -23.582956,
                lng: -47.466718,
                imagem: "Sem_imagem.jpg",
                status: "em_analise",
                categoria: "rocagem",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-02-18T05:25:03Z"),
                observacao: "Duis bibendum.",
                endereco: "2 Browning Court",
                lat: -23.567054,
                lng: -47.431592,
                imagem: "Sem_imagem.jpg",
                status: "pendente",
                categoria: "erradicacao",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-07-23T09:08:10Z"),
                observacao: "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
                endereco: "666 Waxwing Court",
                lat: -23.560974,
                lng: -47.447164,
                imagem: "Sem_imagem.jpg",
                status: "concluida",
                categoria: "poda",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-06-21T09:10:13Z"),
                observacao: "Nullam molestie nibh in lectus.",
                endereco: "414 Morningstar Center",
                lat: -23.554107,
                lng: -47.427078,
                imagem: "Sem_imagem.jpg",
                status: "concluida",
                categoria: "rocagem",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-05-27T17:48:41Z"),
                observacao: "Duis at velit eu est congue elementum. In hac habitasse platea dictumst.",
                endereco: "55915 Warbler Way",
                lat: -23.594852,
                lng: -47.482155,
                imagem: "Sem_imagem.jpg",
                status: "em_analise",
                categoria: "poda",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-01-16T18:28:43Z"),
                observacao: "Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla.",
                endereco: "49 Sommers Parkway",
                lat: -23.541081,
                lng: -47.471067,
                imagem: "Sem_imagem.jpg",
                status: "concluida",
                categoria: "erradicacao",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-05-01T12:20:38Z"),
                observacao: "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus.",
                endereco: "58 Oxford Parkway",
                lat: -23.599244,
                lng: -47.433438,
                imagem: "Sem_imagem.jpg",
                status: "em_analise",
                categoria: "poda",
                idUsuario: 1,
                idFiscal: 1
            },
            {
                data: new Date("2026-08-15T11:34:45Z"),
                observacao: "Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis.",
                endereco: "8750 Pennsylvania Avenue",
                lat: -23.556848,
                lng: -47.485576,
                imagem: "Sem_imagem.jpg",
                status: "em_analise",
                categoria: "erradicacao",
                idUsuario: 1,
                idFiscal: 1
            }
        ]);
        console.log("Seeding de serviços concluído.");
    } else {
        console.log("Sem seeding de serviços necessário (já existem registros).");
    }
}

async function runSeed() {
    try {
        await seedUsuario();
        await seedFuncionario();
        await seedServicos();
        process.exit(0);
    } catch (error) {
        console.error("Erro ao realizar o seeding:", error);
        process.exit(1);
    }
}

runSeed();