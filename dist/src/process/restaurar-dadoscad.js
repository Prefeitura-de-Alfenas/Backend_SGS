"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs = require("fs");
const csv = require("csv-parser");
const prisma = new client_1.PrismaClient();
const filePath = '../../mnt/data/DadosCAD.csv';
async function main() {
    const pessoas = [];
    fs.createReadStream(filePath)
        .pipe(csv({ separator: ';' }))
        .on('data', (row) => {
        pessoas.push({
            id: row.id,
            nome: row.nome,
            cpf: row.cpf.replace(/\D/g, ''),
            sexo: row.sexo,
            telefone: row.tel || row.tel_cel || null,
            email: row.email || null,
            datanascimento: new Date(row.dataNasc.split('/').reverse().join('-')),
            rg: row.rg || null,
            escolaridade: 'Não informado',
            estadocivil: row.estadoCivil || 'Não informado',
            renda: 0,
            ctpsassinada: parseInt(row.CTPS_Serie) || 0,
            ppcl: 0,
            gestante: row.gestante === '1' ? 1 : 0,
            observacao: null,
            observacaorestrita: null,
            cep: '00000-000',
            logradouro: row.endereco || 'Não informado',
            complemento: row.complemento || null,
            bairro: row.bairro || 'Não informado',
            localidade: 'Não informado',
            numero: row.numero || 'S/N',
            uf: 'Não informado',
            status: 'ativo',
            equipamentoId: '24d5123e-e26e-41cd-8d4f-b07edad680fd',
        });
    })
        .on('end', async () => {
        try {
            await prisma.pessoa.createMany({ data: pessoas, skipDuplicates: true });
            console.log('Backup concluído com sucesso!');
        }
        catch (error) {
            console.error('Erro ao inserir dados:', error);
        }
        finally {
            await prisma.$disconnect();
        }
    });
}
main().catch((error) => {
    console.error('Erro na execução do script:', error);
    prisma.$disconnect();
});
//# sourceMappingURL=restaurar-dadoscad.js.map