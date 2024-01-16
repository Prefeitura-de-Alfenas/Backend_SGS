import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEntregaDto } from './DTO/EntregaCreate';

@Injectable()
export class EntregraService {

constructor(private prisma: PrismaService){}
  async create(createEntregaDTO: CreateEntregaDto) {
    try{

      console.log('createEntregaDTO',createEntregaDTO)
        //Verificar se o EquipamentoId do usuario == a o equipamentoId da pessoa
        const usuario = await this.prisma.usuario.findUnique({
          where:{
            id:createEntregaDTO.usuarioId
          }
        })
        if(!usuario){
          return {error:"Usuario não existe"}
        }
        if(usuario.equipamentoId !== createEntregaDTO.equipamentoId){
          return {error:"Este usuario não pode gerar o beneficio para essa familia, essa familia ou usuario e atendido em outro equipamento"}
        }

        //verificar se a data de criação ja faz 30 dias 
        //buscar pessoa e o beneficio que essa pessoa tem com id do beneficio id e verficar se tem data menor que 30 dias
        const beneficioModelador = await this.prisma.entrega.findMany({
          where:{
             beneficioId:createEntregaDTO.beneficioId,
             datacadastro: {
              gte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000), // Subtrai 30 dias da data atual
            },
          }
        })
        console.log(beneficioModelador)
        if(beneficioModelador.length !== 0){
          return {error:"Esse beneficio já foi entregue esse mês para essa familia"}
        }
         


        const entrega = await  this.prisma.entrega.create({
            data:createEntregaDTO
        })
        return entrega
        }
        catch(error){
            return {error: error.message};
        }
  }


  async findAll(take:string,skip:string,filter:string) {
    try{
        const takeNumber = parseInt(take);
        const skipNumber = parseInt(skip);
        const page = (skipNumber == 0) ? skipNumber :  skipNumber * takeNumber;
     
         const entrega = await this.prisma.entrega.findMany(
            {
              where:{
                status:'ativo'
              },
         
         
              take:takeNumber,
              skip:page,
           }
        );
        return entrega;
    }catch(error){
        return {error: error.message}; 
    }
  }
}
