import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PessoaService {
 

 
    constructor(private prisma:PrismaService){}
    async findbyidEntrega(id: string) {
      try{
        const pessoa = await this.prisma.pessoa.findUnique({
          where:{
              id
          },
          include:{
            equipamento:true,
            beneficios: {
              include: {
                beneficio: true,
              },
            },
          }
        })

        if(!pessoa){
            return {error:"Pessoa não existe no sistema"}
        }
        return pessoa;
      }
      catch(error){
        return error.message;
        }
    }
    
    async changeResponsavelFamiliar(idFamilar: string) {
      try{
        //Primeiro pegar o familiar
        
         const familar = await this.prisma.pessoa.findUnique({
          where:{
            id:idFamilar,
            pessoaId: {
              not: null,
            },
          }
         }) 
         if(!familar){
          return {error:"Pessoa já é responsavel ou não existe na base de dados"}
         }
         //pegar todos as pessoas com esse iddo responsavel

         await this.prisma.$transaction([
           this.prisma.pessoa.updateMany({
            where:{
              
              OR: [
                { id: familar.pessoaId },
                // Adicione qualquer outra condição OR, se necessário
                {pessoaId:familar.pessoaId,}
              ],
              
              NOT: {
                id: familar.id,
              },
              
            },
            data: {
              pessoaId: familar.id,
            },
            
          }),

          this.prisma.pessoa.update({
            where:{
              id:familar.id
            },
            data:{
              pessoaId:null
            }
          })
        ]);
         

          
          return {menssage:"Atualizado com sucesso"}
          
  
      }catch(error){
        if(error.message.includes("pessoa_cpf_key")){
          return {error:"CPF já existe na base de dados"}
        }
        return {error: error.message};
      }
      finally {
        await this.prisma.$disconnect();
      }

    }
    
    async create(createPessoaDto: Prisma.PessoaCreateInput) {
      try{
      
        const pessoa = await this.prisma.pessoa.create({
        data: createPessoaDto
       });
      
       return pessoa;
      }catch(error){
        if(error.message.includes("pessoa_cpf_key")){
          return {error:"CPF já existe na base de dados"}
        }
        return {error: error.message};
      }
      
    }

    async update(id: string,updatePessoaDto: Prisma.PessoaUpdateInput) {
      try{
  
        const pessoa = await this.prisma.pessoa.update({
          where:{
            id
          },
          data: updatePessoaDto
       });
      
       return pessoa;
      }catch(error){
        if(error.message.includes("pessoa_cpf_key")){
          return {error:"CPF já existe na base de dados"}
        }
        return {error: error.message};
      }
      
    }
    async findAll(take:string,skip:string,filter:string) {
     const takeNumber = parseInt(take);
     const skipNumber = parseInt(skip);
     const page = (skipNumber == 0) ? skipNumber :  skipNumber * takeNumber;
  
      const pessoas = await this.prisma.pessoa.findMany(
      {
        where:{
          pessoaId: null,
          cpf:{
            contains : filter
          },
          status:'ativo'
        },
        orderBy: {
      
            createdAt: 'desc'
          
        },
        take:takeNumber,
        skip:page,
       
        
    }
     );
     return pessoas;
    }

   async findById(id:string) {
    try{
    const pessoa = await this.prisma.pessoa.findUnique({
      where:{
          id
      },
      include:{
        equipamento:true,
        beneficios:true,
      }
    })
    if(!pessoa){
        return {error:"Pessoa não existe no sistema"}
    }
    return pessoa;
  }
  catch(error){
    return error.message;
    }
  }

   async findAllFamiliares(id:string,take:string,skip:string,filter:string){
    const takeNumber = parseInt(take);
    const skipNumber = parseInt(skip);
    const page = (skipNumber == 0) ? skipNumber :  skipNumber * takeNumber;
 
    const familiares = await this.prisma.pessoa.findMany({
      where:{
        pessoaId:id,
        cpf:{
          contains : filter
        },
        status:'ativo'
        
      },
      orderBy: {
      
        createdAt: 'desc'
      
    },
    take:takeNumber,
    skip:page,
    })
    return familiares;
   }

   async changeStatus(id: string) {
    const pessoa = await this.prisma.pessoa.findUnique({
        where:{id}
    })
    if(!pessoa){
        return ({error:'Pessoa não existe'})
    }
   
    const changeStatusPessoa = await this.prisma.pessoa.update({
        where:{
            id,
            pessoaId: null,
        },
        data:{
            status:pessoa.status == 'ativo' ? 'inativo' : 'ativo'
        }
    })
    return changeStatusPessoa
}


    
  async findAllInativePessoas(take: string, skip: string, filter: string) {
    const takeNumber = parseInt(take);
    const skipNumber = parseInt(skip);
    const page = (skipNumber == 0) ? skipNumber :  skipNumber * takeNumber;

    const pessoas = await this.prisma.pessoa.findMany(
      {
        where:{
          pessoaId: null,
          cpf:{
            contains : filter
          },
          status:'inativo'
        },
        orderBy: {
      
            createdAt: 'desc'
          
        },
        take:takeNumber,
        skip:page,
        
      
    });
      return pessoas;
  }
}
