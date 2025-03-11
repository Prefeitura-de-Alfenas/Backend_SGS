"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const crypto_1 = require("crypto");
const bcrypt = require("bcryptjs");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.permissao.create({
        data: {
            id: (0, crypto_1.randomUUID)(),
            nome: 'Comum',
        },
    });
    await prisma.permissao.create({
        data: {
            id: (0, crypto_1.randomUUID)(),
            nome: 'Admin',
        },
    });
    await prisma.equipamento.create({
        data: {
            id: (0, crypto_1.randomUUID)(),
            nome: 'Admin Ti ',
            responsavel: 'Marcelo',
            sobre: 'Teste',
            observacao: 'Teste',
            cep: '37135-3462',
            logradouro: 'rua Teste',
            complemento: '',
            bairro: 'Alvorda',
            localidade: 'Rua da paz',
            numero: '855',
            uf: 'MG',
        },
    });
    const equipamento = await prisma.equipamento.findFirst();
    await prisma.usuario.create({
        data: {
            id: (0, crypto_1.randomUUID)().toString(),
            nome: 'Marcelo Lima Gomes',
            email: 'marcelo.lima.gomes.23@gmail.com',
            telefone: '45fddsf',
            status: 'ativo',
            senha: await bcrypt.hash('21872187', 10),
            equipamentoId: equipamento.id,
        },
    });
    const usuario = await prisma.usuario.findFirst();
    const permissaoQuery = await prisma.permissao.findFirst({
        where: {
            nome: 'Admin',
        },
    });
    if (usuario && permissaoQuery) {
        await prisma.usuariosOnPermissoes.create({
            data: {
                usuarioId: usuario.id,
                permissaoId: permissaoQuery.id,
            },
        });
    }
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=seed.js.map