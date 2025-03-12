import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as csv from 'csv-parser';
const prisma = new PrismaClient();

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
        escolaridade: 'Não informado', // Adapte conforme necessário
        estadocivil: row.estadoCivil || 'Não informado',
        renda: 0, // Definir valor padrão se não houver informação
        ctpsassinada: parseInt(row.CTPS_Serie) || 0,
        ppcl: 0,
        gestante: row.gestante === '1' ? 1 : 0,
        observacao: null,
        observacaorestrita: null,
        cep: '00000-000', // Adapte conforme necessário
        logradouro: row.endereco || 'Não informado',
        complemento: row.complemento || null,
        bairro: row.bairro || 'Não informado',
        localidade: 'Não informado',
        numero: row.numero || 'S/N',
        uf: 'Não informado',
        status: 'ativo',
        equipamentoId: '24d5123e-e26e-41cd-8d4f-b07edad680fd', // Precisa ser ajustado conforme necessidade
      });
    })
    .on('end', async () => {
      try {
        await prisma.pessoa.createMany({ data: pessoas, skipDuplicates: true });
        console.log('Backup concluído com sucesso!');
      } catch (error) {
        console.error('Erro ao inserir dados:', error);
      } finally {
        await prisma.$disconnect();
      }
    });
}

main().catch((error) => {
  console.error('Erro na execução do script:', error);
  prisma.$disconnect();
});
