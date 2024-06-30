import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import csv from 'csv-parser';

const prisma = new PrismaClient();

async function main() {
  const results: any[] = [];

  fs.createReadStream('/mnt/data/DadosCAD - 2024.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      for (const row of results) {
        try {
          console.log('ROW', row);
          //   await prisma.pessoa.create({
          //     data: {
          //       id: row.id,
          //       nome: row.nome,
          //       cpf: row.cpf,
          //       sexo: row.sexo,
          //       telefone: row.telefone,
          //       email: row.email,
          //       datanascimento: new Date(row.datanascimento),
          //       rg: row.rg,
          //       parentesco: row.parentesco,
          //       escolaridade: row.escolaridade,
          //       estadocivil: row.estadocivil,
          //       renda: parseFloat(row.renda),
          //       ctpsassinada: parseInt(row.ctps_assinada),
          //       ppcl: parseInt(row.ppcl),
          //       gestante: parseInt(row.gestante),
          //       observacao: row.observacao,
          //       observacaorestrita: row.observacaorestrita,
          //       cep: row.cep,
          //       logradouro: row.logradouro,
          //       complemento: row.complemento,
          //       bairro: row.bairro,
          //       localidade: row.localidade,
          //       numero: row.numero,
          //       uf: row.uf,
          //       status: row.status,
          //       equipamentoId: row.equipamentoId,
          //       pessoaId: row.pessoaId,
          //   },
          //  });
          console.log(`Inserted ${row.nome}`);
        } catch (error) {
          console.error(`Error inserting ${row.nome}: `, error);
        }
      }

      await prisma.$disconnect();
    });
}

main()
  .catch((e) => {
    console.log('eerror backup ', e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
