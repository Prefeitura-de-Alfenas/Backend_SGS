import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt'
const prisma = new PrismaClient()
async function main() {
    await prisma.permissao.create({
        data:{
            id:randomUUID(),
            nome: "Comum"
        }
    });
    await prisma.permissao.create({
        data:{
            id:randomUUID(),
            nome: "Admin"
        }
    });

    await prisma.equipamento.create({
        data:{
                id:randomUUID(),
                nome:"Admin Ti ",
                responsavel :"Marcelo" ,
                sobre: "Teste" ,
                observacao : "Teste" , 
                cep : "37135-3462" ,
                logradouro : "rua Teste" ,
                complemento: "",
                bairro :"Alvorda", 
                localidade : "Rua da paz" ,
                numero :"855" ,
                uf :"MG" 
        }
    })
   
    const equipamento = await prisma.equipamento.findFirst();
  
    await prisma.usuario.create({
        data:{
            id: randomUUID().toString(),
            nome: "Marcelo Lima Gomes",
            email: "marcelo.lima.gomes.23@gmail.com",
            telefone: '45fddsf',
            status: "ativo",
            senha: await bcrypt.hash('21872187',10),
            equipamentoId:equipamento.id,
        }
       });

       const usuario = await prisma.usuario.findFirst();
       const permissaoQuery = await prisma.permissao.findFirst({
        where:{
            nome:"Admin"
        }
        }
       );
       if(usuario && permissaoQuery){
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
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })